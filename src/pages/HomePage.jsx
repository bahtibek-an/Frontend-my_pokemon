import React, { useContext, useState } from 'react';
import { FilterBar, PokemonList } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const HomePage = () => {
    const [ count, setState ] = useState(0);
    const {onClickLoadMore} = useContext(PokemonContext)

    const handleClick = () => {
        setState(prev => prev + 1);
        console.log(count)
        if(count > 5) {
            return;
        }
        onClickLoadMore();
    }

	return (
		<>
			<PokemonList />
            <FilterBar />
            <div className="container-btn-load-more container">
                {count > 5 ? (
                    null
                ) : (
                    <button className='btn-load-more' onClick={handleClick}>
                        more
                    </button>
                )}
            </div>
		</>
	);
};
// а тут кнопка продолжительности