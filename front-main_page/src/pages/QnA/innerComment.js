import React, { useEffect, useState, useRef } from 'react'

import Delete from './delete'
import CommentAdd from './commentAdd'
import CommentContent from './commentcontent'

import Box from '@mui/material/Box'
import Portal from '@mui/material/Portal'

const InnerComment = (e) => {
  // 매게변수로 받은 commentid 값
  const { commentId } = e

  // 대댓글 보관함
  const [innerComments, setInnerComments] = useState([])

  // dropdown 박스용
  const [innerCommentButton, setInnerCommentButton] = useState(false)
  const innerCommentContainer = useRef(null)
  const innerCommmentButtonClick = () => {
    setInnerCommentButton(!innerCommentButton)
  }

  // 대댓글 출력문
  const qnaInnerFind = async () => {
    try {
      const res = await fetch('http://localhost:3001/QnAInner').then((res) =>
        res.json()
      )
      setInnerComments(res)
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  useEffect(() => {
    qnaInnerFind()
  }, [])

  // 대댓글 추가 기능
  const innerCommentAdd = async (props) => {
    try {
      // 먼저 댓글 받은 유저의 정보와 쓴 댓글 내용을 body에 저장
      const body = {
        qnaId: commentId,
        userId: props.commentAddName,
        password: props.commentAddPassword,
        content: props.commentAddContent,
        userIP: '155',
      }
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch('http://localhost:3001/QnAInnerAdd', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          if (data.error) {
            alert(data.error)
          } else {
            // console.log(data)
            setInnerComments(data)
          }
        })
    } catch (error) {
      console.error(error)
    }
  }

  // 삭제 기능
  const innerCommentDelete = async (props) => {
    try {
      const body = {
        // innercomment 의 id값을 받는다.
        ID: props.commentId,
        userId: props.commentDeleteName,
        password: props.commentDeletePassword,
      }
      const requestOptions = {
        // 데이터 통신의 방법과 보낼 데이터의 종류, 데이터를 설정합니다.
        method: 'POST', // POST는 서버로 요청을 보내서 응답을 받고, GET은 서버로부터 응답만 받습니다. PUT은 수정, DELETE는 삭제
        headers: {
          'Content-Type': 'application/json',
        }, // json형태의 데이터를 서버로 보냅니다.
        body: JSON.stringify(body),
      }
      await fetch('http://localhost:3001/QnAInnerDelete', requestOptions)
        .then((res) => res.json()) // res 결과 값을 PROMISE 형태 파일로 받음
        .then((data) => {
          // .then을 한 번더 써야 사용할 수 있는 JSON 실질적인 값을 받을 수 있음
          if (data.error) {
            alert(data.error)
          } else {
            setInnerComments(data)
            // setComments(data)
          }
        })
    } catch (error) {
      alert('실패하였습니다.')
      console.error(error)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={innerCommmentButtonClick}
        className="comment_button"
      >
        더보기
      </button>
      <Box ref={innerCommentContainer}>
        {innerCommentButton ? (
          <Portal container={innerCommentContainer.current}>
            <div className="innerComments_print">
              {innerComments.map((innerComment, index) =>
                innerComment.QNA_ID === commentId ? (
                  <div key={index} className="comments_print">
                    {/* 댓글 내용 */}
                    <CommentContent comment={innerComment} />

                    {/* 삭제 버튼 */}
                    <Delete
                      commentId={innerComment.ID}
                      commentDelete={innerCommentDelete}
                    />
                  </div>
                ) : (
                  ''
                )
              )}
              {/* 작성 부분 */}
              <CommentAdd commentAdd={innerCommentAdd} />
            </div>
          </Portal>
        ) : null}
      </Box>
    </>
  )
}
export default InnerComment
