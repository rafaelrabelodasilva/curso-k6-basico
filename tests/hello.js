import http from 'k6/http'
import { sleep, check } from 'k6'

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export default function () {
  const res = http.get('http://localhost:3333') //Constante res que guarda o resultado de cada requisição

    check(res, {
        'Status should be 200': (r) => r.status === 200 //Verifica se o status code é 200
    })

    sleep(1); //Faz sleep de 1s, como se fosse o thinking time do usuário
}