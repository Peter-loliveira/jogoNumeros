//Este aquivo contem todos os códigos do jogo original, em que a partida automatica faz TODO o mjogo sem interferencia humana


var nrEscolhido = document.getElementById("numero")
//Variaveis para pegar os nomes digitados dos jogadores
var jogador1 = document.getElementById("nomeJogador1")
var jogador2 = document.getElementById("nomeJogador2")
//Variaveis para exibir a mensagem de jogo finalizado e vencedor
var acertou = document.getElementById("acertou")
var jogadorVencedor = document.getElementById("vencedor")
//Variavel para determinar de quem é a vez de jogar
var jogadorDaVez = document.getElementById("jogadorDaVez")
//Pega qual o nr que deve ser acertado no jogo
var nrChutado = document.getElementById("chute")
//Variavel que irá verificar se a parida ja encerrou
var partidaFinalizada = false
//variavel que iniciará uam parytida automatica
var cbJogarAutomaticamente = document.getElementById("cbJogarAutomaticamente")
cbJogarAutomaticamente.onclick = () => {
    partidaAutomatica()
}

//Add evento que identifica se a tecla enter foi pressionada. Se sim, clica no botão de Chute
//Chupado da internet. Ainda não o entendi direito
nrChutado.addEventListener('keypress', function (e) {
    if (e.which == 13) {
        btChute.onclick()
    }
}, false)

//Add ao função habilitaChute() para iniciar o jogo
var btJogar = document.getElementById("jogar")
btJogar.onclick = () => {
    habilitaChute()
}

//Add a função chute a botão
var btChute = document.getElementById("chutar")
btChute.onclick = () => {
    chute()
}
//Vai criando a lista contendo os erros cometidos
var tentativas = document.getElementById("listaChutes")

//Veriavel para determinar em que rodada estamos
let rodada = 0

//Desabilita os campos de nr escolhido e habilita o botão de chute
function habilitaChute() {
    if (cbJogarAutomaticamente.checked) {
        btChute.disabled = true
    } else {
        btChute.disabled = false
        cbJogarAutomaticamente.disabled = true
    }
    nrChutado.focus()
    //desabilita o campo nrEscolhido para evitar que ele psosa ser mudado DURANTE o jogo
    nrEscolhido.disabled = true
    jogadorDaVez.innerHTML = `Jogador da vez: ${jogador1.value}`
}

//A mágica
function chute() {
    //Cria o elemneto LI que será posteriormente inserido na UL
    let linha = document.createElement("li")
    rodada++

    let vencedor
    if (rodada % 2 == 0) {
        //coloquei a opção de vencedor AQUI apenas para não ter que criar OUTRO IF
        jogadorDaVez.innerHTML = `Jogador da vez: ${jogador1.value}`
        vencedor = jogador2
    } else {
        jogadorDaVez.innerHTML = `Jogador da vez: ${jogador2.value}`
        vencedor = jogador1
    }

    //Verifica se o numero digitado é igual ao numero inical do jogo
    if (nrChutado.value == nrEscolhido.value) {
        partidaFinalizada = true
        acertou.innerHTML = "ACERTOU"
        jogadorDaVez.innerHTML = ""
        jogadorVencedor.innerHTML = `O vencedor jogador vencedor foi: ${vencedor.value}`
        //Textos para o caso do nr ser acertado lçogo no inico ou depois de pelo menos duas tentativas
        if (rodada == 1) {
            acertouTentativas.innerHTML = `O Nr escolhido foi ${nrEscolhido.value} e foi necessária ${rodada} tentativa.`
        } else {
            acertouTentativas.innerHTML = `O Nr escolhido foi ${nrEscolhido.value} e foram necessárias ${rodada} tentativas. `
        }
        //Como o nr já foi acertado, desabilita os dois componentes abaixo(botão e campo nrChute)
        btChute.disabled = true
        nrChutado.disabled = true
    } else {
        //caso valor digitado seja diferente do nr do jogo, verifica se ele é maior ou menor e exibe uma mensagem para o jogador
        let maior
        if (nrChutado.value < nrEscolhido.value) {
            maior = false
        } else {
            maior = true
        }
        switch (maior) {
            case true:
                linha.innerHTML = `Tentativa ${rodada}. Nr. chutado foi ${nrChutado.value} e é MAIOR que o Nr. escolhido`
                break;
            default:
                linha.innerHTML = `Tentativa ${rodada}. Nr. chutado foi ${nrChutado.value} e é MENOR que o Nr. escolhido`
                break;
        }
        //Adciona os LIs na UL, zera o conteudo do campo nrChutado
        tentativas.appendChild(linha)
        if (!cbJogarAutomaticamente.checked) {
            nrChutado.value = ""
            nrChutado.focus()
        }
    }
}

function numeroAleatorio(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function abilitaDesabilita(verifica) {
    switch (verifica) {
        case true:
            //desabilita TODOS os componetes
            nrEscolhido.disabled = true
            jogador1.disabled = true
            jogador2.disabled = true
            nrChutado.disabled = true
            btChute.disabled = true
            btJogar.disabled = true
            nrChutado.disabled = true
            break;
        default:
            //Advinha...
            nrEscolhido.disabled = false
            jogador1.disabled = false
            jogador2.disabled = false
            nrChutado.disabled = false
            btJogar.disabled = false
            nrChutado.disabled = false
            //Com excessão do botão de Chute que CONTINUA desabilitado.
            break;
    }
}

var nrMin = 1
var nrMax = 100

function partidaAutomatica() {
    if (cbJogarAutomaticamente.checked) {
        alert("Partida automatica LIGADA. Não é necessária intervenção HUMANA. LARGA DESGRAÇA")
        alert("O numero escolhido estará entre 1 e 100")
        //Desabilita os campos
        abilitaDesabilita(true)
        jogador1.value = "Megatron"
        jogador2.value = "Optimus Prime (aquele babaca!)"
        nrEscolhido.value = (numeroAleatorio(nrMin, nrMax))
        while (partidaFinalizada === false) {
            nrChutado.value = numeroAleatorio(nrMin, nrMax)
            btChute.onclick()
            if ((nrMin < nrChutado.value) && (nrChutado.value < nrEscolhido.value)) {
                nrMin = nrChutado.value
            }
            if ((nrMax > nrChutado.value) && (nrChutado.value > nrEscolhido.value)) {
                nrMax = nrChutado.value
            }
        }
    } else {
        alert("Partida automatica DESLIGADA")
        abilitaDesabilita(false)
        jogador2.value = ""
        jogador1.value = ""
        nrEscolhido.value = ""
    }
}