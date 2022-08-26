import React from "react"

export default function Meme() {
    
    //Seta o state como um objeto e o inicializa com uma url base
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    //Seta o state como um array vazio que vai receber
    //os dados da API
    const [allMemes, setAllMemes] = React.useState([])
    
    //"useEffect" que lida com o "fetch" que faz o consumo
    //da API
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            //Salva os dados no array "allMemes"
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    //Função que salva uma url de uma imagem aleatória
    function getMemeImage() {
        //Gera um valor aleatório limitado ao tamanho do array
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        //Salva em uma variável o valor do atributo "url" contido em uma posição
        //aleatória do array "allMemes"
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    //Função que observa as mudanças de valores nos inputs do form
    function handleChange(event) {
        //Usamos uma callback function para podermos usar
		//os valores antigos de "meme" e modificamos apenas
		//a propriedade "name", que recebe o "value" digitado
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
