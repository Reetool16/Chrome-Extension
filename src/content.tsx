import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoRender
} from "plasmo"
import { useEffect, useState, type FC } from "react"
import { createRoot } from "react-dom/client"

import Frame from "../assets/Frame.svg"
import Modal from "./modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainerParent = document.querySelector('[role="textbox"]')
      if (rootContainerParent) {
        clearInterval(checkInterval)
        const rootContainer = document.createElement("div")

        rootContainerParent.appendChild(rootContainer)
        resolve(rootContainer)
      }
    }, 0)
  })

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [linkedinMessage, setLinkedinMessage] = useState("")

  useEffect(() => {
    const focusHandler = () => {
      setIsFocused(true)
    }

    const blurHandler = () => {
      setIsFocused(false)
    }

    const textbox = document.querySelector('[role="textbox"]')
    if (textbox) {
      textbox.addEventListener("focus", focusHandler)
      textbox.addEventListener("blur", blurHandler)

      return () => {
        textbox.removeEventListener("focus", focusHandler)
        textbox.removeEventListener("blur", blurHandler)
      }
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const handleInsert = (message: string) => {
    setLinkedinMessage(message)
    const textbox = document.querySelector('[role="textbox"]')
    if (textbox) {
      textbox.textContent = message
    }
  }
  return (
    <div>
      {isFocused && (
        <div
          style={{
            position: "absolute",
            bottom: "-23px",
            right: "100px",
            transform: "translateY(-24px) translateX(42px)"
          }}
          onClick={openModal}>
          <img src={Frame} alt="" width={"32px"} />
        </div>
      )}
      {isModalOpen && <Modal onClose={closeModal} onInsert={handleInsert} />}
    </div>
  )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  createRootContainer
}) => {
  const rootContainer = await createRootContainer()
  const root = createRoot(rootContainer)
  root.render(<PlasmoOverlay />)
}

export default PlasmoOverlay
