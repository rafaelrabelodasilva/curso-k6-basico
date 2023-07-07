import http from 'k6/http'
import { sleep, check } from 'k6'

import uuid from './libs/uuid.js'

export const options = { //Aqui estamos internalizando os argumentos do script k6, essa constante obrigatóriamente precisa ter o nome de "options"
  vus: 1, //Define a quantidade de virtual users
  duration: '1m', //Define a duração do teste,
  thresholds: { //Define os limites na execução do teste de performance
    http_req_duration: ['p(95)<2000'], //Métrica criada para avaliar 95% das requisições que tem que responder em até 2s 
    http_req_failed: ['rate<0.01'] //Métrica criada para que somente 1% das requisições podem apresentar erro
  }
}

export default function () {

  const url = 'http://localhost:3333/signup'

  const payload = JSON.stringify( // Módulo nativo do javaScript. Transforma um objeto json em uma string mantendo o seu formato
    { email: `${uuid.v4().substring(24)}@qa.qacademy.com.br`, password: 'pwd123' } //v4 é uma função do browserify que vai gerar um identificador dinâmico. A função substring() é nativa do javascript, e ela "cortará" os primeiros 24 caracteres que irá ser gerado pelo browserify
  )

  const headers = { //Constante que guarda o cabeçalho da requisição
    'headers': {
      'Content-Type': 'application/json'
    }
  }

  const res = http.post(url, payload, headers) //Constante res que guarda o resultado de cada requisição

  console.log(res.body)

  check(res, {
    'Status should be 200': (r) => r.status === 201 //Verifica se o status code é 200
  })

  sleep(1); //Faz sleep de 1s, como se fosse o thinking time do usuário
}