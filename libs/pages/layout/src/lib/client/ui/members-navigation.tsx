import { UserEntity } from '@beep/contracts'
import { Button, ButtonStyle, Icon, InputText, UseModalProps } from '@beep/ui'
import { useState } from 'react'
import { ListMembers } from './list-members'

interface MembersNavigationProps {
  users: UserEntity[]
  onInviteMember: () => void
  openModal: React.Dispatch<React.SetStateAction<UseModalProps | undefined>>
  closeModal: () => void
  inviteCode: string
}

export default function MembersNavigation({
  users,
  onInviteMember,
  openModal,
  closeModal,
  inviteCode,
}: MembersNavigationProps) {
  const [isRightDivVisible] = useState(false)

  return (
    <div
      className={`bg-violet-300 p-6 rounded-r-3xl flex flex-col gap-6 ${
        isRightDivVisible ? 'w-full' : 'sm:w-fit'
      }`}
    >
      <div className="flex flex-row justify-between items-center gap-10">
        <div className="flex flex-row gap-2 items-center">
          <Icon name="lucide:chevron-down" />
          <h5 className="text-slate-900 font-semibold">Members</h5>
        </div>
        <Button
          iconLeft="lucide:plus"
          className="!bg-violet-400 !min-w-0 px-2 xl:px-3 py-2 text-base rounded-xl hover:rounded-2xl transition-rounded font-semibold flex flex-row gap-2 justify-center items-center cursor-pointer"
          onClick={() => {
            openModal({
              content: <InviteMemberModal inviteCode={inviteCode} />,
            })
          }}
        >
          <h5>Invite</h5>
        </Button>
      </div>
      <div className="flex flex-col gap-1 overflow-y-scroll no-scrollbar scroll-smooth">
        <ListMembers users={users} />
      </div>
    </div>
  )
}

interface InviteMemberModalProps {
  inviteCode: string
}

function InviteMemberModal({ inviteCode }: InviteMemberModalProps) {
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="p-6">
      <h3 className=" text-slate-700 font-bold mb-2 max-w-sm">
        Invite your friends
      </h3>
      <div className="text-slate-500 text-sm mb-4">
        Share this code to invite your friends to this server
      </div>
      <div className="flex flex-row gap-6">
        <InputText
          className="w-full !rounded-lg min-h-[40px]"
          label={'Invite code'}
          name="code"
          type="text"
          disabled={true}
          value={inviteCode}
        />

        <div>
          <Button
            className="!bg-violet-500"
            style={ButtonStyle.SQUARE}
            onClick={copyToClipboard}
          >
            {copied ? (
              <Icon name="lucide:clipboard-check" />
            ) : (
              <Icon name="lucide:clipboard-copy" className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
