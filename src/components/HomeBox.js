import './HomeBox.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Illustration(){
    return(
        <div className = 'content__illustration inline-flex justify-center my-3'>
            <img width="300px" className = "pikachu__image" src="/homeImage.png" alt="home image" />
        </div>
    );    
}

function Heading(){
    return(
        <div className = 'content__heading flex justify-center align-center'>
            <img width = "250px" src='/pokemonLogo.svg' alt='pokemon logo' />
        </div>
    );
}

function GoButton(){
    return(
        <div className = 'content__button flex items-center justify-center my-3'>
            <Link to='/pokemon'>
                <button className='inline-flex items-center  text-blue-800 font-medium bg-blue-100 p-3 rounded-md border-2 border-transparent hover:border-blue-800 hover:bg-blue-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600'>
                    <span>
                        <img className = 'mr-3' width = "30px" height = "30px" src = '/pokeball.png' alt = 'pokeball' />
                    </span>
                    Let's Go!
                </button>
            </Link>
        </div>
    );
}

function HomeBox(){
    return(
        <div className = 'homeBox rounded-xl select-none shadow-xl grid grid-cols-1 p-3'>
            <Heading />

            <Illustration />

            <GoButton /> 

            <Footer />
        </div>
    );
}

export default HomeBox;