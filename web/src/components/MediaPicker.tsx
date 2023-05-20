'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<null | string>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  return (
    <>
      <div>
        <input
          type="file"
          name="coverUrl"
          id="media"
          className="invisible h-0 w-0"
          accept="image/*"
          onChange={onFileSelected}
        />

        {preview && (
          // eslint-disable-next-line
          <img
            src={preview}
            alt="Image preview"
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
      </div>
    </>
  )
}
