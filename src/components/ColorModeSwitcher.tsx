import { useEffect } from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '../library/hooks/useDarkMode';
import theme from '../themes/main';

export const ColorModeSwitcher: React.FC<Omit<IconButtonProps, 'aria-label'>> =
  (props) => {
    const { isDarkMode, toggle } = useDarkMode(
      theme.config.initialColorMode == 'dark',
    );

    const { setColorMode } = useColorMode();
    const text = useColorModeValue('dark', 'light');
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (isDarkMode) {
          setColorMode('dark');
        } else {
          setColorMode('light');
        }
      }, 0);

      return () => clearTimeout(timeout);
    }, [isDarkMode]);

    return (
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        color="green.400"
        marginLeft="2"
        onClick={toggle}
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        title={`Switch to ${text} mode`}
        {...props}
      />
    );
  };
