import { AuthContext } from "./AuthContext";

export default function Landing() {
  return(
    <AuthContext.Consumer>
      {({}) => (
        <div className='landing'>
          <h1>Neto Social</h1>
          <h2>Facebook and VK killer</h2>
        </div>
      )}
    </AuthContext.Consumer>
  )
}