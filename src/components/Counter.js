/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Countervalue from './Countervalue';


const Counter = () => {

    const [n, setn] = useState(1);
    const [flg, setFlg] = useState(0);
    const maxn = 1000;

    useEffect(() => {

        if (n === null) {
            setn(1);
        }

        const get_from_back = async () => {
            const response = await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/nitesh.json');
            const val = await response.json();

            if (val !== null) {
                await setn(parseInt(val));
            }
        }

        get_from_back();

    }, []);

    useEffect(() => {

        setFlg(0);

        if (n === null) {
            setn(1);
        }
        if (n >= maxn) {
            setn(maxn);
        }
        if (n <= 0) {
            setn(0);
        }

        const update_in_back = async () => {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nitesh: n })
            };

            const response = await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', requestOptions);
            const val = await response.json();
            if (val) {
                setFlg(val + 2);
            }
            else {
                setFlg(1);
            }

        }

        update_in_back();


    }, [n]);


    const decrement = () => {
        if (n <= 0) {
            setn(0);
        }
        else
            setn(n - 1);
    }

    const increment = () => {
        if (n >= maxn) {
            setn(maxn);
        }
        else
            setn(n + 1);

    }



    return (
        <div className="counter">

            {(flg === 0) ? (
                <div className="upper-text" >
                    <div className="load">
                        <Loader />
                    </div>
                    <p >Saving Counter value</p>
                </div>) : (<div className="upper-text"></div>)
            }

            <div className="box">
                <button className="minus" onClick={() => decrement()} > - </button>
                <input
                    type="number"
                    onChange={(e) => setn(parseInt(e.target.value))}
                    value={n}
                />
                <button className="plus" onClick={() => increment()}> + </button>
            </div>
            <div>
                <Countervalue temp={n} />
            </div>
        </div>


    );

}

export default Counter;