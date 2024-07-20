import React from 'react';


 

const RegistrationForm = () => {

    return (

        <div className="main">

            <header>

                <h2 className="logo">Care&Cure</h2>

            </header>

            <form action="#" className="form">

                <section className="box">

                    <header style={{ color: 'rgb(92, 126, 165)' }}>

                        <h5>Register as New User</h5>

                    </header>

                    <label htmlFor="fullname"><b>Name</b></label><br />

                    <input type="text" id="fullname" className="input-field" placeholder="Enter your full Name" /><br /><br />

 

                    <label htmlFor="phone"><b>Phone:</b></label>

                    <input type="text" id="phone" className="input-field2" placeholder="Enter your phone number" /><br /><br />

 

                    <label htmlFor="address"><b>Permanent Address:</b></label>

                    <textarea id="address" rows="6" cols="25" className="input-field" placeholder="Enter your full address"></textarea><br /><br />

 

                    <label htmlFor="email"><b>Email:</b></label>

                    <input type="email" id="email" className="input-field3" placeholder="Enter your email" /><br /><br />

 

                    <label htmlFor="password"><b>Password:</b></label>

                    <input type="password" id="password" className="input-field4" placeholder="Enter your password" /><br /><br />

 

                    <label htmlFor="confirmPassword"><b>Confirm Password:</b></label>

                    <input type="password" id="confirmPassword" className="input-field4" placeholder="Enter your password" /><br /><br />

 

                    <label htmlFor="gender"><b>Gender:</b></label>

                    <input type="radio" id="male" name="gender" value="male" className="input-field5" />

                    <label htmlFor="male">Male</label>

                    <input type="radio" id="female" name="gender" value="female" className="input-field5" />

                    <label htmlFor="female">Female</label><br /><br />

 

                    <button type="submit" style={{ marginLeft: '250px', borderRadius: '1px', padding: 'auto', width: '100px', height: '30px', backgroundColor: 'rgba(135, 225, 236, 0.76)' }}>

                        Submit

                    </button>

                </section>

            </form>

        </div>

    );

}

 

export default RegistrationForm;

 

