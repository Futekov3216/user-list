import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInfo } from '../Utils';
import ButtonComponent from './ButtonComponent'
import Posts from './Posts'
import { setUsers } from '../redux/actions'
import UserDetails from './UserDetails';
import {URL} from "../config"

function Wrapper() {

    const [user_info, setUsersInfo] = useState([]);
    const [render, setRender] = useState(false);
    const [active, setActive] = useState({})
    const dispatch = useDispatch()
    const all_users = [];

    useEffect(() => {
        fetchInfo(`${URL}/users`)
            .then(data => {
                return data.map((res, i) => {
                    const {
                        name,
                        username,
                        email,
                        phone,
                        website,
                        address: {
                            street,
                            suite,
                            city
                        }
                    } = res;
            
                    const information_collection = {  // EXTRACT ONLY THE NEEDED DATA FOR EACH USER TO DISPLAY
                        'name': name,
                        'username': username,
                        'email': email,
                        'phone': phone,
                        'website': website,
                        'street': street,
                        'suite': suite,
                        'city': city,
                    }
            
                    all_users.push({ // assaign user [id] as key
                        [res.id]: information_collection
                    })
            
                    if (i === (data.length - 1)) { // wait to collect all users data
                        setUsersInfo(all_users)
                        dispatch(setUsers(all_users)) // set needed data for all the users to the store
                        setRender(true)
                    }
                })
            })
    }, [])

    const handleClick = useCallback((id) => {
        const newObj = { ...active }
        newObj[id] = !newObj[id]
        setActive(newObj)
    }, [active])

    return (
        <div className="wrapper">
            {
                render ? user_info.map((res, i) => {

                    const id = Object.keys(res)[0]
                    const user_details = res[id]

                    return <div key={i} className="user-container">
                        <span>{user_details.name}</span>
                        <button className={`${!active[id] ? 'hide' : 'show'}`} onClick={() => handleClick(id)}>{`${!active[id] ? 'hide' : 'show'} user`}</button>
                        <div className={`user-data-wrapper ${!active[id] ? 'active' : 'inactive'}`}>
                            <UserDetails // RENDER EACH USER
                                information={user_details}
                            />
                            <ButtonComponent user_id={id} />
                            <Posts user_id={id}/>
                        </div>
                    </div>
                }) : null
            }
        </div>
    );
}

export default Wrapper;
