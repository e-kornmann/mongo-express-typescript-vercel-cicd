import Header from './Components/Header/Header';
import { Link } from 'react-router-dom';
import background from './Assets/bg.svg';
import { useSelector } from 'react-redux';
import { User } from './types';

const App = () => {
  const user: User = useSelector((state: any) => state.user);
  const { userId } = user;


  return (
    <>


      <div className='mainpage' style={{ backgroundImage: `url(${background})` }}>
        <Header />

        
          <div className='main-title'>
            You go out... <br /> we take care <br /> of your <br /> little ones 
        

          { userId === 'empty' ? (
            <div className='main-btns'>
              <Link className='pick-date' to='/calendar'>Pick Date</Link>
              <Link className='main-link' to='/login'>Log in</Link>
              <Link className='main-link' to='/register'>Create Account</Link>
            </div>
          ) : (
            <div className='main-btns'>
              <Link className='pick-date' to='/calendar'>Pick Date</Link>
            </div>
          )}
            </div>
      </div>
      

    </>
  );
}

export default App;
