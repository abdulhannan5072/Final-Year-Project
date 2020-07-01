import React, {} from 'react'
// import { useSelector, useDispatch} from 'react-redux'

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

// import {authCheckState} from '../store/actions';


const TheLayout = (props) => {

// //mapStateToProps
// const isAuth = useSelector(state => state.auth.token !== null )
// //mapDispatchToProps
// const dispatch = useDispatch()
// const tryAutoSignin = () => dispatch(authCheckState())

// useEffect(() => {
//   tryAutoSignin()
// },[])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
