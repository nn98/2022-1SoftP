import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const userCreateStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Create = (e) => {
  // 회원가입 열고 닫기 창
  const [open, setOpen] = useState(false)
  const userHandleOpen = () => setOpen(!open)

  // 유저를 위한 name password
  const [createUserName, setCreateUserName] = useState('')
  const [createUserPassword, setCreateUserPassword] = useState('')

  // 새 유저를 생성하기 위한 createUser 함수
  const createUser = (props) => {
    try {
      // 유저 정보 body에 저장
      const body = {
        name: props.createUserName,
        password: props.createUserPassword,
      }
      // 유저가 1명 이상일때만
      if (e.users.length > 0) {
        // 유저의 아이디와 생성할 아이디가 같으면
        for (let i = 0; i < e.users.length; i++) {
          if (e.users[i].name === props.createUserName) {
            // 오류 메세지 출력
            return alert('현재 사용 중인 사용자가 있습니다.')
          }
        }
      }

      // 유저 보관함에 추가
      e.setUsers([...e.users, body])
      setOpen(!open)
      return alert('어서오세요')
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }
  return (
    <div>
      <button className="comment_button" onClick={userHandleOpen}>
        회원가입
      </button>
      <Modal open={open} onClose={userHandleOpen}>
        <Box sx={userCreateStyle}>
          <input
            onChange={(e) => setCreateUserName(e.target.value)}
            placeholder="Name"
            type="text"
            value={createUserName}
          />
          <input
            onChange={(e) => setCreateUserPassword(e.target.value)}
            placeholder="password"
            type="password"
            value={createUserPassword}
          />

          <button
            disabled={!createUserName || !createUserPassword}
            name="commenting"
            value="Signup"
            onClick={() => {
              createUser({ createUserName, createUserPassword })
              // createUserName과 createUserPassword 빈칸으로 만들기
              setCreateUserName('')
              setCreateUserPassword('')
            }}
          >
            Signup
          </button>
        </Box>
      </Modal>
    </div>
  )
}

export default Create
