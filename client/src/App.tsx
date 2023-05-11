import Header from './Components/Header/Header';
import { Link } from 'react-router-dom';
import background from './Assets/bg.svg';
import AuthDetails from './Components/AuthDetails';
import { useSelector } from 'react-redux';
import { User } from './types';

const App = () => {
  const user: User = useSelector((state: any) => state.user);
  const { userId } = user;


  return (
    <>
      <AuthDetails />
      <div className='mainpage' style={{ backgroundImage: `url(${background})` }}>
        <Header />

        <div className='main__container'>
          <div className='main__title'>
            You go out... <br /> we take care <br /> of your <br /> little ones 
          </div>

          { userId === 'empty' ? (
            <div className='main__btns'>
              <Link className='pick__date' to='/calendar'>Pick Date</Link>
              <Link className='main__link' to='/login'>Log in</Link>
              <Link className='main__link' to='/register'>Create Account</Link>
            </div>
          ) : (
            <div className='main__btns'>
              <Link className='pick__date' to='/calendar'>Pick Date</Link>
            </div>
          )};
      </div>
      </div>

    </>
  );
}

export default App;
