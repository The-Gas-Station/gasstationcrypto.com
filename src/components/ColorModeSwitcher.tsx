import * as React from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher: React.FC<Omit<IconButtonProps, 'aria-label'>> =
  (props) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="green.400"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        title={`Switch to ${text} mode`}
        {...props}
      />
    );
  };
