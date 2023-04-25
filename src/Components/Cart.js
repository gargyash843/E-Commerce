import React, { useState, useEffect } from 'react'

import Navbar from './Navbar'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import CartCard from './CartCard'
import './Cart.css'

const Cart = () => {
    
    function GetCurrentUser() {
        const [user, setUser] = useState("");
     
        const usersCollectionRef = collection(db, "users");

        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    // console.log(userlogged.email)
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                        // console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }



    const makePayment = async (e) => {
        e.preventDefault();
    
        // Make API call to the serverless API
           
        const data = 500;
    
        // let res = await fetch('/api/razorpay', {
        //   method: 'POST', // or 'PUT'
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(data),
        // })
        // let response = await res.json()
        // console.log(response);
    
    
        // let key = process.env.RAZORPAY_KEY;
        // console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY)
    
        const options = {
          key: "rzp_test_ijv2EdLEy05f67" ,  // Enter the Key ID generated from the Dashboard
          amount:46800*100,
          currency: "INR",
          name: "Yash Garg",
          description: "Tutorial of RazorPay",
          // image: "https://avatars.githubusercontent.com/u/25058652?v=4",
          // order_id: order.id,
        //   order_id: response.id,
         // callback_url: "/api/paymentvarification",
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
          },
          notes: {
            "address": "Razorpay Corporate Office"
          },
          theme: {
            "color": "#821232"
          }
        };
    
        const razor = new window.Razorpay(options);
        razor.open();
        
        
      
    
    
      };











    const loggeduser = GetCurrentUser();


    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            // console.log(path)
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
                // console.log('done')
            }).catch('Error error error')

        }
        getcartdata()
    }
    
   


    return (<>
        <div>
            <Navbar />

            {cartdata ?
                <div>
                    <div className='cart-head'>Your Cart Items</div>
                    <div className='allcartitems'>
                        {cartdata.map((item) => (
                            <CartCard
                                key={item.id}
                                itemdata={item}
                                userid={loggeduser[0].uid}
                             
                            />
                        ))}

                        



                        <div className='proceed'>
                            <button onClick={makePayment} >Payment</button>
                        </div>
                    </div>

                </div>
                : <p>Your Cart is empty</p>}
        </div>
        </>
    )
}

export default Cart