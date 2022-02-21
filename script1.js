let votodigitado = document.querySelector('.structure-1-1 span');
let titulo = document.querySelector('.structure-1-2 span');
let descricao = document.querySelector('.structure-1-4');
let aviso = document.querySelector('.structure-2');
let lateral = document.querySelector('.structure-1-right');
let numeros = document.querySelector('.structure-1-3');
let etapaAtual = 0;
let numero ='';
let votoBranco ='';
let votbranco =0;
let votnul =0;

document.addEventListener("keydown", function (event) {

 if (isNaN(event.key)) {//if verificando se é numero ou ñ
     console.log(event.key)
    switch (event.key) { //switch chamado para validar qual será a função

        case 'Enter': votar();
            break;

         case 'Backspace': corrige();
            break;

    }
}
else {
    inserir(event.key)
}
});

function comecarEtapas() {
    let etapa = etapadevotacao[etapaAtual];
    let numeroHtml = '';
    numero ='';

    votoBranco = false;
    console.log(etapa)
    for (let cont = 0; cont < etapa.numeros; cont++) {
        if (cont === 0){
            numeroHtml += '<div class="number flashes"></div>';
        } else {
            numeroHtml += '<div class="number"></div>';
        }
    }
    votodigitado.style.display = 'none';
    titulo.innerHTML = etapa.ocupacao;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function inserir(n) {
    let numerol =document.querySelector('.number.flashes');

    if (numerol != null) {
        numerol.innerHTML = n;
        numero = numero + n;

        numerol.classList.remove('flashes'); //vai passar a piscar o próximo quadrado
        if (numerol.nextElementSibling !== null) {
            numerol.nextElementSibling.classList.add('flashes');
        }

        else { cleardisplay();
        }

    }
}

function cleardisplay() {


    let arraycandidatos = etapadevotacao[etapaAtual].candidatos;
    // console.log(arraycandidatos);

    let candidatoIndex = arraycandidatos.findIndex((item) => {
        return item.numero === numero
    });
    // console.log(candidatoIndex)


    if (candidatoIndex >= 0) {
        let candidatoData = arraycandidatos[candidatoIndex];

        //console.log(candidatoData)

        votodigitado.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = 'Nome: ' + candidatoData.nome + '<br/>' + 'Partido: ' + candidatoData.chapa;
        let  fotosHTML = '<div class="structure-1-image"> <img src="imagens/' + candidatoData.foto.url + '" alt="" />' + candidatoData.foto.legenda + '</div>';
        lateral.innerHTML = fotosHTML;

    }

    else if (etapaAtual <4) {
       descricao.innerHTML = '<div class="medium-chat flashes">VOTO NULO</div>';
        descricao.innerHTML = '';
        votoNulo = true;
        votodigitado.style.display = 'block';
        aviso.style.display = 'block';
        lateral.innerHTML = '';
        numeros.innerHTML = '';
        alert('voto em Nulo');
        etapaAtual++;
        votnul++;
        comecarEtapas();


    }
    else{
        alert('Voto Nulo confirmado');
        votodigitado.style.display = 'none';
        titulo.innerHTML = '';
        descricao.innerHTML = '<div class="strong-chat flashes">FIM</div>';;
        aviso.style.display = 'none';
        lateral.innerHTML = '';
        numeros.innerHTML = '';
        votnul++;

    }
}
function corrige (){
    numero ='';
    comecarEtapas();
}

function votar (){
    let etapavotacao =etapadevotacao[etapaAtual];
    let candidateList = etapavotacao.candidatos;

    console.log(etapavotacao);
    console.log(candidateList);

    if(etapaAtual < 5){

        if(etapavotacao != undefined){

            candidateList.forEach(candidate => {
                if (candidate.numero == numero ) {
                    //candidate.votos++;
                    //console.log(candidate)
                    etapaAtual++;

                    if (etapaAtual != 5){
                        comecarEtapas();
                        candidate.votos++;



                    }else{

                        votodigitado.style.display = 'none';
                        titulo.innerHTML = '';
                        descricao.innerHTML = '<div class="strong-chat flashes">FIM</div>';;
                        aviso.style.display = 'none';
                        lateral.innerHTML = '';
                        numeros.innerHTML = '';
                    }

                }
            });
        }
    }

}


function resultado() {
    let resultadosprint = document.getElementById('resultTest');


    // console.log(resultadosprint)
    //console.log(etapadevotacao)

    resultadosprint.innerHTML = "";
    resultadosprint.innerHTML ="";

    etapadevotacao.forEach(etapa => {
        etapa.candidatos.forEach(candidato => {
            resultadosprint.innerHTML += "<div class='resultados'> <h4>" + candidato.nome + " " +candidato.votos+ "</h4></div>";
        })

    });
    resultadosprint.innerHTML += "<div class='branconulo'> <h4> Voto Nulo "+votnul+ " <br> Voto Branco "+votbranco+ "</h4></div>";
}

function branco() {

    if (etapaAtual <4) {
        votoBranco = true;
        votodigitado.style.display = 'block';
        aviso.style.display = 'block';
        lateocupacaonerHTML = '';
        numeros.innerHTML = '';
//    descricao.innerHTML = '<div class="minum-chat flashes">VOTO EM BRANCO</div>';
        descricao.innerHTML = '';
        alert('voto em branco');
        etapaAtual++;
        votbranco++;
        comecarEtapas();
    }else{
        votodigitado.style.display = 'none';
        titulo.innerHTML = '';
        descricao.innerHTML = '<div class="strong-chat flashes">FIM</div>';;
        aviso.style.display = 'none';
        lateral.innerHTML = '';
        numeros.innerHTML = '';
        votbranco++;
    }


}


function recomecarUrna() {

    etapa = 0;
    etapaAtual = 0;

    comecarEtapas();

}