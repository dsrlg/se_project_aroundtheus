//getUserInfo
//username,
//setUserInfo(name, description)
export default class userInfo{
    constructor({userNameSelector, userDescriptionSelector}){
        this._userName= document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
    }

    gerUserInfo(){
        return{
            name:this._userName ? this._userName.textContent:" ",
            description : this._userDescription ? this._userDescription.textContent : " "
        };
    }

    setUserInfo({name,description}){
        this._userName.textContent=name;
        this._userDescription.textContent=description;
    }
}
