import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignView from './pages/SignView'
import DocView from './pages/DocView'
import UploadDocView from './pages/UploadDocView'
import ConfirmDocView from './pages/ConfirmDocView'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/docView" element={<DocView />}></Route>
        <Route path="/uploadDoc" element={<UploadDocView />}></Route>
        <Route path="/confirmDoc" element={<ConfirmDocView />}></Route>
        <Route path="/signDoc" element={<SignView />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
