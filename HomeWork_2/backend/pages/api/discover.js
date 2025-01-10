import {
    getVideosSortedByTitle,
    getVideosSortedByLikeCount,
    getVideosSortedByDifficulty,
    getVideosByBodyPart,
    changeLikeCount,
  } from '../../lib/VideosDB';

  import {checkURLForUser,addURLForUser,removeURLForUser,} from '../../lib/UsersLikeDB';
  

  export default async function handler(req, res) {
    setCorsHeaders(res);

    switch (req.method) {
      case 'OPTIONS':
            return res.status(200).end();
      case 'GET':
        return await handleGETRequest(req, res);
      case 'PATCH':
        return await handlePATCHRequest(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
  /**
 * Handle GET request.
 * 
 * @param {Object} req
 * @param {Object} res
 */
  async function handleGETRequest(req, res) {
    const { action } = req.query;
    if (!action) {
      return res.status(400).json({ message: 'Action for GET is required' });
    }
    try {
      switch (action) {
        case 'sortByTitle':
          return await sortVideosByTitle(req, res);
        case 'sortByLikes':
          return await sortVideosByLikeCount(req, res);
        case 'sortByDifficulty':
          return await sortVideosByDifficulty(req, res);
        case 'filterByBodyPart':
          return await filterVideosByBodyPart(req, res);
        default:
          return res.status(400).json({ message: 'Invalid action for GET' });
      }
    } catch (error) {
      return handleError(error, res);
    }
  }
  
  /** 
 * Handle PATCH request and continue to classify requeset
 * by user action variable
 * 
*/
  async function handlePATCHRequest(req, res) {
    const { action } = req.body;
    if (!action) {
      return res.status(400).json({ message: 'Action for PATCH is required' });
    }
    try {
      switch (action) {
        case 'updateVideoLikes':
          return await updateVideoLikes(req, res);
        default:
          return res.status(400).json({ message: 'Invalid action for PATCH' });
      }
    } catch (error) {
      return handleError(error, res);
    }
  }

  async function sortVideosByTitle(req, res) {
    try {
      const { userName, ascending, bodyPart } = req.query;
      if (!userName || !bodyPart) {
        return res.status(400).json({ message: 'Body part and username is required' });
      }
      const videos = await getVideosSortedByTitle(bodyPart,ascending=="true");
      const likes = await getLikes(userName, videos);
      console.log("Here", likes);

      return res.status(200).json({videos, likes });
    } catch (error) {
      return handleError(error, res);
    }
  }
  
  async function sortVideosByLikeCount(req, res) {
    try {
      const { userName, highestFirst, bodyPart } = req.query;
      if (!userName || !bodyPart) {
        return res.status(400).json({ message: 'Body part and username is required' });
      }
      const videos = await getVideosSortedByLikeCount(bodyPart,highestFirst=="true");
      const likes = await getLikes(userName, videos);

      return res.status(200).json({videos, likes });
    } catch (error) {
      return handleError(error, res);
    }
  }
  
  async function sortVideosByDifficulty(req, res) {
    try {
      const { userName, beginnerFirst, bodyPart } = req.query;
      if (!userName || !bodyPart) {
        return res.status(400).json({ message: 'Body part and username is required' });
      }
      
      const videos = await getVideosSortedByDifficulty(bodyPart,beginnerFirst=="true");
      const likes = await getLikes(userName, videos);

      return res.status(200).json({videos, likes });
    } catch (error) {
      return handleError(error, res);
    }
  }
  
  async function filterVideosByBodyPart(req, res) {
    try {
      const { userName, bodyPart } = req.query;
      if (!userName || !bodyPart) {
        return res.status(400).json({ message: 'Body part and username is required' });
      }
  
      const videos = await getVideosByBodyPart(bodyPart);
      const likes = await getLikes(userName, videos);
  
      return res.status(200).json({ videos, likes });
    } catch (error) {
      return handleError(error, res);
    }
  }
  /**
   * Retrieves like statuses for the user's videos in session.
   * 
   * @param {string} userName - The username.
   * @param {Array<string>} videos - Array of video URLs.
   * @returns {Array<boolean>} Array indicating if the user liked the videos in his session before.
   */
  async function getLikes(userName, videos) {

      try {
          const likes = await Promise.all(
              videos.map((video) => checkURLForUser(userName, video.url))
          );
          return likes;
  
      } catch (error) {
          return handleError(error, res);
      }
  }
  
  
  async function updateVideoLikes(req, res) {
    try {
      const { userName, url, likeAction } = req.body;
      if (!userName || !url) {
        return res.status(400).json({ message: 'One or more components are missing' });
      }
  
      const exists = await checkURLForUser(userName, url);
  
      if (likeAction && !exists) {
        await addURLForUser(userName, url);
        await changeLikeCount(url, 1);
      } else if (!likeAction && exists) {
        await removeURLForUser(userName, url);
        await changeLikeCount(url, -1);
      }
  
      return res.status(200).json({ message: 'Update checks complete' });
    } catch (error) {
      return handleError(error, res);
    }
  }

  // Function to set CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Function to handle errors
function handleError(error, res) {
  console.error('Internal server error:', error);
  return res.status(500).json({ message: 'Internal server error', error });
}


  
  