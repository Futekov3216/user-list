import { useSelector } from 'react-redux';
import { useEffect, useState, memo, useMemo, useCallback } from 'react'
/**
 * 
 * @param {number} user_id 
 */
const Posts = memo(({ user_id }) => {

    const all_users = useSelector(state => state.all_users)
    const [posts, setPosts] = useState([])
    const [toggle, setToggle] = useState(false)
    const user = useMemo(() => all_users.find(element => element[user_id])[user_id], [user_id, all_users]); // get current user
    const user_post = useMemo(() => user.posts, [ user.posts])

    useEffect(() => {
        setPosts(user_post)
    }, [user_post])

    const handleToggle = useCallback(() => { 
        setToggle(!toggle)
    }, [toggle])

    return (
        <div>
            {user_post ? <button className={`toggle-posts-${toggle ? 'show' : 'hide'}`} onClick={handleToggle}>{`${toggle ? 'show' : 'hide'} posts`}</button> : null}
            <div className={`posts-wrapper ${!toggle ? 'show-posts' : 'hide-posts'} `}>
                {
                    posts ? posts.map((res, i) => {
                        return <div key={i}>
                            <br />
                            <div style={{ fontWeight: 'bold' }}>{res.title.toUpperCase()}</div>
                            <br />
                            <div>{res.body}</div>
                        </div>
                    }) : null
                }

            </div>
        </div>
    );
})

export default Posts;