// LogoutButton.jsx
import React, { useState } from 'react';
import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear userId from localStorage as well
    navigate('/'); // Redirect to the home page or login page
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        colorScheme="red"
        position="absolute"
        top="20"
        right="20"
        aria-label="Logout"
      >
        Logout
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to log out? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default LogoutButton;
