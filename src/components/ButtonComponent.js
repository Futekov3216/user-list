import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPosts } from '../redux/actions'
import { fetchInfo } from '../Utils'
import {URL} from "../config"
/**
 * 
 * @param {number} user_id 
 */
const ButtonComponent = memo(({ user_id }) => {

    const user = useSelector(state => state.all_users.find(element => element[user_id]))
    const dispatch = useDispatch()

    const handleClick = () => {
        fetchInfo(`${URL}/posts?userId=${user_id}`).then(data => {
            user[user_id].posts = data
            dispatch(setUserPosts(data))
        })
    }

    return (
        <div className="button-wrapper">
            <button className="fetch-users" onClick={handleClick}>Get user’s posts</button>
        </div>
    );
})

export default ButtonComponent;