import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

// Função para obter o IP correto no Android
const getReactotronHost = () => {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL?.split('://')[1].split(':')[0];
  return scriptHostname || 'localhost';
};

const reactotron = () => {
  if (__DEV__) {
    Reactotron.configure({
      name: 'MeuApp',
      host: getReactotronHost(), // Configura automaticamente o IP do emulador/dispositivo
    })
      .useReactNative() // API simplificada da versão 2.x
      .connect(); // Conecta ao Reactotron

    // Configura o console.tron para usar ao invés de console.log
    // @ts-ignore
    console.tron = Reactotron;

    Reactotron.clear();
  }
};

export default reactotron;
