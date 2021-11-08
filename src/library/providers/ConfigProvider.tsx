import { ReactNode, createContext, useState, useContext } from 'react';
import { FullConfig, Config } from '../models/config/Config';
import { DEFAULT_CONFIG } from '../models/config/default';
import merge from 'lodash.merge';

interface ConfigProviderProps {
  children: ReactNode;
  config: Config;
}

const context = createContext<{
  config: FullConfig;
  updateConfig: (config: Config) => void;
}>({
  config: DEFAULT_CONFIG,
  updateConfig: () => undefined,
});

export function ConfigProvider({ config, children }: ConfigProviderProps) {
  const [state, setState] = useState<FullConfig>({
    ...DEFAULT_CONFIG,
    ...config,
  });

  const updateConfig = (config: Config) =>
    setState((draft: FullConfig) => merge({}, draft, config));

  return (
    <context.Provider value={{ config: state, updateConfig: updateConfig }}>
      {children}
    </context.Provider>
  );
}

export default ConfigProvider;

export const useConfig = () => useContext(context).config;
export const useUpdateConfig = () => useContext(context).updateConfig;
