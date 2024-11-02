import '../style/card.css'
export default function Card(props) {
    return (
        <div className="card">
            <div className="defaultInfo">
                <img src={require('../photos/default-avatar.jpg')} alt='user_img' />
                <span>unknown user</span>
            </div>
            <div className='opinions-content'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    )
}