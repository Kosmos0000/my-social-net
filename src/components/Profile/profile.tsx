import React, {useState} from 'react';
import userImage from './../../common-images/user.png'
import style from './profile.module.css'

function Profile() {
    const [accordionState, setAccordionState] = useState(false);
    const [editMode, setEditMode] = useState(false);
    return (
        <div className={style.flex}>
            <div>
                <img className={style.userImage} src={userImage} alt="photo"/>
            </div>
            <div className={style.userInfo}>
                {editMode ?
                    <input className={style.status} autoFocus onBlur={() => setEditMode(!editMode)} type="text"/> :
                    <div className={style.status} onDoubleClick={() => setEditMode(!editMode)}>status...</div>}
                <div className={style.infoItems}>fullName</div>
                <div className={style.infoItems}>lookingForAJob</div>
                <div className={style.infoItems}>lookingForAJobDescription</div>
                <div className={style.infoItems} onClick={() => setAccordionState(!accordionState)}>contacts:</div>
                {accordionState &&
                    <div className={style.accordItemsBlock}>
                        <div className={style.infoItemsAccord}>github</div>
                        <div className={style.infoItemsAccord}>facebook</div>
                        <div className={style.infoItemsAccord}>vk</div>
                        <div className={style.infoItemsAccord}>instagram</div>
                        <div className={style.infoItemsAccord}>twitter</div>
                        <div className={style.infoItemsAccord}>website</div>
                        <div className={style.infoItemsAccord}>youtube</div>
                        <div className={style.infoItemsAccord}>mailLink</div>
                    </div>}
            </div>
        </div>
    );
}

export default Profile;