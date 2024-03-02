// Modal.tsx
import React, { useState } from "react"

import "./modal.css"

import DownArrow from "../assets/downA.svg"
import Vector from "../assets/Vector.svg"

interface ModalProps {
  onClose: () => void
  onSubmit?: (formattedPrompt: string, replyMessage: string) => void
  onInsert: (replyMessage: string) => void
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, onInsert }) => {
  const [prompt, setPrompt] = useState("")
  const [formattedPrompt, setFormattedPrompt] = useState("")
  const [replyMessage, setReplyMessage] = useState("")
  const [showInsert, setShowInsert] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPrompt("")
    const formatted = `${prompt}`
    setFormattedPrompt(formatted)
    const hardcodedReplyMessage =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    setReplyMessage(hardcodedReplyMessage)
    setShowInsert(true)
    onSubmit(formatted, hardcodedReplyMessage)
  }

  const handleInsertClick = () => {
    onInsert(replyMessage)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {formattedPrompt && <p className="prompt">{formattedPrompt}</p>}
        {replyMessage && <p className="reply">{replyMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Your Prompt..."
          />
          <button type="submit">
            <img
              src={Vector}
              alt="vector"
              height={"12px"}
              style={{ marginRight: "6px" }}
            />
            {formattedPrompt ? "Regenerate" : "Generate"}
          </button>
          {showInsert && (
            <button type="button" onClick={handleInsertClick} id="insert-btn">
              <img
                src={DownArrow}
                alt="DownArrow"
                height={"12px"}
                style={{ marginRight: "6px" }}
              />
              Insert
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Modal
