import React, { MouseEvent } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { deletePoll } from '../features/polls/pollSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

interface Props {
    show: boolean;
    onHide: MouseEvent<HTMLButtonElement>|any;
    title?: string;
    message?: string;
    pollId?: string;
}

export default function CustomModal(props: Props) {
    const dispatch = useAppDispatch();
    const { singlePoll } = useAppSelector(state => state.poll);
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are You Sure?</h4>
        <p>
          {props.message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <button
            style={{
            backgroundColor: "red !important",
            backgroundImage:
                "linear-gradient(90deg, rgb(230, 0, 0), rgb(250, 100, 52))",
            boxShadow: "0px 3px 10px 0px rgb(250, 100, 52)"
            }}
            onClick={() => {
                dispatch(deletePoll(singlePoll?.pollId))
                props.onHide()
            }}
            className="btn btn-danger"
        >
            Confirm
        </button>
      </Modal.Footer>
    </Modal>
  )
}
