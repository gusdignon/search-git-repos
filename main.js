//Projeto para aprendizagem, exercicios II e III do desafio 3 de JavaScript da rocketseat
//Implantar busca de repositorios no github a partir do input do nome do usuario
//Utilizado AJAX, biblioteca axios, aplicando conceito de promises
//baseado no desafio https://skylab.rocketseat.com.br/api/files/1566499182493.pdf


var gitUser = '';
var repos;
var input = document.getElementsByName('user')[0];
var bodyElement = document.querySelector('body');
var divLista = document.createElement('div');

bodyElement.appendChild(divLista);

//Função para coletar input com enter
input.addEventListener('keypress', function(event){
    if (event.keyCode === 13){
        getInput();
    }
});

console.log(axios.get('https://api.github.com/users/diego/repos')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    }));





function getInput() {
    divLista.innerHTML='';
    gitUser = input.value;
    
    divLista.innerHTML = 'CARREGANDO...';

    axios.get('https://api.github.com/users/'+ gitUser +'/repos')
    .then(function(response){     
        if (response.request.readyState === 4){
            repos = response.data;
            var listElement = document.createElement('ul');
            var j = 1;
            for(i of repos){
                var listInstance = document.createElement('li');
                var hrefElement = document.createElement('a');
                var textHref = document.createTextNode('repo' + j);
                var link = i.html_url;
        
                hrefElement.setAttribute('href', link);
                hrefElement.appendChild(textHref);
                listInstance.appendChild(hrefElement);
                listElement.appendChild(listInstance);

                j = j+1;
                }
                divLista.innerHTML = '';
                divLista.appendChild(listElement);
        }
            
    })
    .catch(function(error){
        divLista.innerHTML='';
        var textErro = document.createTextNode('Usuário não encontrado!')
        divLista.appendChild(textErro);
    })
}
