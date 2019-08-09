const handleSignin = (db,bcrypt) => (req,res)=>{

    const { email, password } = req.body;
    if(!email || !password)
    {
        return res.status(400).json('incorrect form submission')
    }
    db.select('email','hash').from('login')
        .where('email','=',email)
        .then(data =>{
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')     //it works even without returning
                    .where('email','=',email)
                    .then(user =>{
                        res.json(user[0])
                    })
                    .catch(err=>{
                        res.status(400).json("Unable to find the user")
                    })
            }else{
                res.json("User does not exist.")
            }
        })
        .catch(err=>{
            res.status(400).json("Wrong credentials")
        })
}

module.exports = {
    handleSignin:handleSignin
}