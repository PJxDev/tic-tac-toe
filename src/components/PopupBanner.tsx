import { PopupBannerProps } from '../types'

export const PopupBanner: React.FC<PopupBannerProps> = ({
  title,
  button,
  buttonAccent,
  children
}) => {
  return (
    <>
      <div className='flex flex-col items-center gap-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-button text-button-text w-full py-8'>
        {title && <h4>{title}</h4>}
        {children}
        <section className='buttons || flex justify-center items-center gap-4 text-background font-bold'>
          <button
            onClick={button.clickFn}
            className='!bg-button-text shadow-button shadow-reset-button-shadow p-2 rounded-lg'
          >
            {button.text}
          </button>
          <button
            onClick={buttonAccent.clickFn}
            className='!bg-accent shadow-button shadow-accent-shadow p-2 rounded-lg'
          >
            {buttonAccent.text}
          </button>
        </section>
      </div>
    </>
  )
}
