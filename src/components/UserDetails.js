import InputComponent from './InputComponent'
/**
 * 
 * @param {object} information 
 */
const UserDetails =  ({ information }) => {
    console.log(information)

    return (
        <div className="data-wrapper">
            {
                Object.keys(information).map(function(key, i) {
                       return <div className="details-wrapper" key={i} ><span>{`${key}`}</span>
                        <InputComponent // RENDER EACH INPUT FOR THE CURRENT USER
                            name={key}
                            defaultValue={information[key]}
                        /></div> 
                   })
            }
        </div>
    );
}

export default UserDetails;