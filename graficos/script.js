const url = 'https://raw.githubusercontent.com/marcos-03/api/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');

let rotulosX = ["Ford","Chevrolet","porsche","Ferrari","Bmw","Mercedes","toyota"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: '#Disciplina Preferida',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                            '#4682B4',  
                            '#A52A2A', 
                            '#FF4500', 
                            '#B0E0E6', 
                            '#808080', 
                            '#00008B', 
                            '#3498DB'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo X
                    text: 'Disciplinas', // Texto do título do eixo X
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Y
                    text: 'Quantidade de Votos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.Ford;
            valores[1] = resp.Chevrolet;
            valores[2] = resp.porsche;
            valores[3] = resp.Ferrari;
            valores[4] = resp.Bmw;
            valores[5] = resp.Mercedes;
            valores[6] = resp.toyota;

            // Atualiza o gráfico com os novos valores
            grafico.update();
            exibirFraseInformativa(valores);
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 3000);

// Função para exibir frase informativa
function exibirFraseInformativa(url) {
    const informacaoDiv = document.getElementById('informacao');
    informacaoDiv.innerHTML = `
    <p>A indústria automobilística mundial é marcada por uma grande diversidade de marcas que competem constantemente pela atenção dos consumidores, oferecendo desde carros populares até modelos de luxo e desempenho extremo. Entre as mais destacadas, encontramos empresas como <strong>Ford</strong> e <strong>Ferrari</strong>, que compartilham uma posição de destaque, ambas com 10 pontos, representando excelência tanto em veículos de alto desempenho quanto em popularidade. 

 <p> A <strong>Ford</strong>, com sua longa história de inovação e produção em massa, continua a ser uma referência no mercado global, oferecendo desde modelos acessíveis até versões de performance, como os esportivos Mustang. Já a <strong>Ferrari</strong>, famosa por sua exclusividade e por seus carros de superalta performance, é um símbolo de luxo e prestígio, com uma reputação construída ao longo de décadas nas pistas de corrida.</p>

<p> Outro grande nome da indústria é a <strong>Chevrolet</strong>, que com 8 pontos, continua sendo uma das marcas mais confiáveis e populares no mundo, oferecendo uma vasta gama de veículos que atendem desde o público em busca de praticidade, até os entusiastas de carros esportivos, com modelos como o **Camaro**. </p>

<p> Marcas como <strong>Porsche </strong> e <strong>BMW</strong>, que obtêm 5 e 7 pontos, respectivamente, representam uma mistura de luxo e desempenho. A <strong>Porsche</strong>, com sua linha de carros esportivos icônicos, continua a ser uma escolha de destaque para quem busca emoção e exclusividade ao dirigir. A <strong>BMW</strong>, conhecida por seus carros que combinam conforto, tecnologia e performance, é uma das preferidas por aqueles que desejam um veículo premium com uma experiência de condução diferenciada.
A <strong>Mercedes-Benz</strong>, com 9 pontos, também se destaca como uma das líderes no segmento de carros de luxo e tecnologia de ponta. Seus modelos são sinônimo de conforto, segurança e sofisticação, agradando desde quem busca elegância até os que exigem performance.
Por fim, a <strong>Toyota</strong>, com 8 pontos, permanece como uma gigante no mercado global, conhecida pela confiabilidade e eficiência de seus veículos. Com uma linha diversificada que inclui desde carros compactos até modelos híbridos e SUVs, a Toyota continua a atrair uma base de clientes fiel.</p>
Essas marcas, com suas respectivas pontuações, refletem a variedade e a competitividade do mercado automobilístico, onde a inovação, qualidade e a adaptação às necessidades dos consumidores são sempre os maiores drivers de sucesso.. <br>   `;
}
