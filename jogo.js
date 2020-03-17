var nrEscolhido = document.getElementById("numero")

var jogador1 = document.getElementById("nomeJogador1")
var jogador2 = document.getElementById("nomeJogador2")
var acertou = document.getElementById("acertou")
var aacertouTentativas = document.getElementById("acertouTentativas")
var jogadorVencedor = document.getElementById("vencedor")
var jogadorDaVez = document.getElementById("jogadorDaVez")
var nrChutado = document.getElementById("chute")

nrChutado.addEventListener('keypress', function(e){
    if(e.which == 13){
       btChute.onclick()
    }
 }, false)

var btJogar = document.getElementById("jogar")
btJogar.onclick = () => {
    abilitaChute()
}

var btChute = document.getElementById("chutar")
btChute.onclick = () => {
    chute()
}
var tentativas = document.getElementById("chutes")
let rodada = 0

//Desabilita os campos de nr escolhido e habilita o botão de chute
function abilitaChute() {
    btChute.disabled = false
    nrChutado.focus()
    nrEscolhido.disabled = true
    jogadorDaVez.innerHTML = `Jogador da vez: ${jogador1.value}`
}

function chute() {
    
    // nrChutado = parseInt(nrChutado)
    let linha = document.createElement("li")
    rodada++
    let vencedor

    if (rodada % 2 == 0) {
        jogadorDaVez.innerHTML = `Jogador da vez: ${jogador1.value}`
        //coloquei a opção de vencedor AQUI apenas para não ter que criar OUTRO IF
        vencedor = jogador2        
    } else {
        jogadorDaVez.innerHTML = `Jogador da vez: ${jogador2.value}`
        vencedor = jogador1
    }

    if (nrChutado.value == nrEscolhido.value) {
        acertou.innerHTML = "ACERTOU"
        jogadorDaVez.innerHTML = ""
        jogadorVencedor.innerHTML = `O vencedor jogador vencedor foi: ${vencedor.value}`
        if (rodada == 1) {
            acertouTentativas.innerHTML = `O Nr escolhido foi ${nrEscolhido.value} e foi necessária ${rodada} tentativa.`
        } else {
            acertouTentativas.innerHTML = `O Nr escolhido foi ${nrEscolhido.value} e foram necessárias ${rodada} tentativas. `
        }
        btChute.disabled = true;
        // btChute.setAttribute("disabled", "true")

    } else {
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
        tentativas.appendChild(linha)
        document.getElementById("chute").value = ""
        document.getElementById("chute").focus()
    }
}