import { useLocation } from "wouter";
import { useLoginLogic } from "../utils/LoginPageLogic";
import Title from "../components/Title";
import ActionButton from "../components/ActionButton";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = () => {
  const [, navigate] = useLocation(); // Navigation hook for routing
  
  const {
    username,
    setUsername,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    message,
    handleLoginClick,
    loading,
  } = useLoginLogic(navigate); // Hook to manage login logic

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="pt-20 flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Page Title */}
        <Title text="Login to Your Account" />
        <div className="w-full max-w-sm space-y-6">
          {/* Username Input */}
          <UsernameInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleVisibility={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
          />
        </div>
        {/* Show spinner or login button based on loading state */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ActionButton
            label="Login"
            iconClass="fas fa-sign-in-alt"
            onClick={handleLoginClick}
          />
        )}
        {/* Display login messages */}
        <Message message={message} />
      </div>
    </div>
  );
};

export default LoginPage;
