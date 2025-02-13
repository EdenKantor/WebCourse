import { saveToSessionStorage } from "../utils/LocalSessionHelper"; 

export const useDiscover1PageLogic = () => {

    // Handles user selection of a body area.
    // Saves the selected body area to sessionStorage and navigates to the next page.
    const handleBodyAreaChoice = (bodyArea,navigate) => {
        // Save bodyAreaChoice (button name category) to sessionStorage
        const bodyAreaChoice = {
          bodyArea: bodyArea,
        };
        saveToSessionStorage("bodyAreaChoice", bodyAreaChoice);
        navigate('/discover2');
      };
    

    return {
        handleBodyAreaChoice,
        };
}
