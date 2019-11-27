//utilizando axios para acessar a API
const axios = require('axios');
//importando a API da TotalVoice, já instalada como dependência
const totalVoice = require('totalvoice-node');

//aqui é passado o token de acesso da sua conta na Totalvoice
const client = new totalVoice(process.env.TOTALVOICE_KEY);

//criando um vetor de servidores
const servers = [
  {
    name: 'Servidor 1', 
    url: 'http://localhost:4001', 
    developer: {
      name: 'Anderson Raphael Ferreira', 
      phone: process.env.DEVELOPER_PHONE
    }
  }, 
  {
    name: 'Servidor 2', 
    url: 'http://localhost:4002', 
    developer: {
      name: 'Anderson Raphael Ferreira', 
      phone: process.env.DEVELOPER_PHONE
    }
  },
];

//função assíncrona executada logo após sua criação
//essa função recebe as variáveis, configurações e faz as verificações
(async function() {
  console.log('Iniciando monitoramento dos servidores...');

  for(const server of servers){
    axios({
      url: server.url, 
      method: 'get',
    }).then((response) => {
      console.log(`${server.name} executando...`);
    }).catch(() => {
      console.log(`${server.name} parou!`);
      const message = `${server.developer.name}, o ${server.name} está fora do ar. Resolver o mais rápido possível.`;
      //configurações para a api da totalvoice
      const options = {
        velocidade: 2, 
        tipo_voz: 'br-Vitoria'
      };
      client.tts.enviar(server.developer.phone, message, options).then(() => {
        console.log(`O desenvolvedor ${server.developer.name} já foi avisado.`);
      });
    });
  }
  
  console.log('Encerrando monitoramento dos servidores...');
})();