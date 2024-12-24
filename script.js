class heroi{

    //construtor
    constructor(nome, idade, classe){
        this.nome = nome;
        this.idade = idade; 
        this.classe = classe;
        
        //atributos
        this.hpTotal;
        this.mpTotal;     
        this.forca = 0;
        this.resistencia = 0;
        this.nivel = 1;
        this.xp = 0;

        this.habilidade = {};
        this.definirClasse(this.classe);
        this.hp = this.hpTotal;
        this.mp = this.mpTotal;
    }

    //metodo para definir a classe
    definirClasse(classe){
        switch(classe){
            case 'guerreiro':
                this.definirAtributos(classe,2,0.5,1.5,2);
                
                break;

            case 'mago':
                this.definirAtributos(classe,0.5,1.5,2,1);
                break;

            case 'monge':
                this.definirAtributos(classe,1.5,1,2,2);
                break;

            case 'ninja':
                this.definirAtributos(classe,0.5,1,5,3);
                break;
        }
    }

    //metodo para definir o atributos
    definirAtributos(classe, hp, mp, forca, resistencia){
        this.hpTotal = 50 * hp;
        this.mpTotal =  50 * mp;
        this.forca = 2 * forca;
        this.resistencia = 2 * resistencia;

        if(classe == 'guerreiro'){
           this.habilidade.skillUm = this.definirHabilidades('skillUm','corte simples', this.forca * 2, 5);

        }else if(classe == 'mago'){
            this.habilidade.skillUm =  this.definirHabilidades('skillUm','bola de fogo', (this.forca + this.mp) * 2, 8);

        }else if(classe == 'monge'){
            this.habilidade.skillUm = this.definirHabilidades('skillUm','soco forte', this.forca * 2, 5);

        }else if(classe == 'ninja'){
            this.habilidade.skillUm = this.definirHabilidades('skillUm','ataque furtivo', this.forca * 2, 5);
        }
    }

    //metodo para definir as habilidades
    definirHabilidades(skill, nomeSkill, forcaSkill, mpSkill){
        skill ={
            nome: nomeSkill,
            forca: forcaSkill,
            mp: mpSkill
        };
        return skill;
    }

    //metodo para atacar o inimigo
    ataque(){
        console.log(`Você atacou o inimigo com uma forca de: ${this.forca}`);
        return this.forca;
    }

    //metodo de ataque com habilidade
    ataqueHabilidade(){
        console.log(`Você utilizou ${this.habilidade.skillUm.nome} da classe ${this.classe} contra o inimigo com a forca de: ${this.habilidade.skillUm.forca}`);
        this.mp--;
        return this.habilidade.skillUm.forca;
    }

}

//classe inimigo
class Inimigo{
    constructor(){
        this.hpTotal = 100;
        this.mpTotal = 100;     
        this.forca = Math.floor(Math.random()*30);
        this.resistencia = Math.floor(Math.random()*30);
        this.nivel = 1;
        this.xp = 0;

        this.hp = this.hpTotal;
        this.mp = this.mpTotal;
    }

    ataque(){ //aque normal do inimigo
        console.log(`O inimigo atacou com a forca de ${this.forca}`);     
        return this.forca;   
    }

    ataqueHabilidade(){ //dano com habilidade do inimigo
        console.log(`Inimigo utilizou habilidade contra o jogador com a forca de: ${this.forca}`);
        this.mp--;
        return this.forca;
    }

}

const soldado = new heroi('Gladiador', 33, 'guerreiro'); //iniciando heroi
const inimigo = new Inimigo(); //iniciando o inimigo

function random(valor){
   return Math.floor(Math.random()*valor);
}

console.log(`--------Inicio da batalho--------`);

//simulando batalha
while(inimigo.hp > 0){
    //ataque do jogaddor
    if(random(100) > 50){ //jogador conseguiu acertar o ataque
        if(random(100) < 10){ 
            // ataque critico
            let danoCriticoPlayer = soldado.ataque();
            console.log(`o inimigo sofreu um dano critico: ${danoCriticoPlayer * 1.5}`);
            inimigo.hp -=  danoCriticoPlayer * 1.5;
            console.log(`vida atual do inimigo: ${inimigo.hp}`);
        
        }else if(random(100) > 11 && random(100) < 30){ 
            // ataque com habilidade
            console.log(`o inimigo sofreu dano com habilidade: ${soldado.ataqueHabilidade()}`);
            inimigo.hp -=  soldado.ataqueHabilidade();
            console.log(`vida atual do inimigo: ${inimigo.hp}`);

        }else{
            //ataque normal
            console.log(`o inimigo sofreu dano normal: ${soldado.forca}`);
            inimigo.hp -=  soldado.forca;
            console.log(`vida atual do inimigo: ${inimigo.hp}`);
        }
    }
    
  

    if(random(100) > 70){ //ataque do inimigo
        if(random(100) < 10){ 
            // ataque critico
            let danoCriticoInimigo = inimigo.ataque();
            console.log(`o ${soldado.nome} sofreu um dano critico: ${danoCriticoInimigo *1.5}`);
            soldado.hp -=  danoCriticoInimigo *1.5;
            console.log(`vida atual do jogador: ${soldado.hp}`);

        }else if(random(100) > 11 && random(100) < 30){ 
            // ataque com habilidade
            console.log(`o jogador sofreu dano com habilidade: ${inimigo.ataqueHabilidade()}`);
            soldado.hp -=  inimigo.ataqueHabilidade();
            console.log(`vida atual do jogador: ${soldado.hp}`);

        }else{
            //ataque normal
            console.log(`o jogador sofreu dano normal: ${inimigo.forca}`);
            soldado.hp -=  inimigo.forca;
            console.log(`vida atual do jogador: ${soldado.hp}`);
        }
    }

    if(soldado.hp <= 0 || inimigo.hp <= 0){
        inimigo.hp = 0;
        break;
    }
}