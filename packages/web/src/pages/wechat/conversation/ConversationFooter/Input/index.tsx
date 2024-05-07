/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dispatch, memo, SetStateAction, useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { useSetRecoilState } from 'recoil';
import { Editable, ReactEditor, Slate } from 'slate-react';

import { canBeDetected } from '@/components/NodeDetected';
import { conversationInputValueState } from '@/state/conversationState';
import { MetaDataType } from '@/state/detectedNode';
import Element from '@/wechatComponents/SlateText/Element';
import { SLATE_INITIAL_VALUE } from '@/wechatComponents/SlateText/utils';

import { useConversationAPI } from '../../context';
import { focusFix } from './utils';

type Props = {
  showEmojiPanel?: boolean;
  setShowEmojiPanel?: Dispatch<SetStateAction<boolean>>;
};

const Input = ({ showEmojiPanel, setShowEmojiPanel }: Props) => {
  const { inputEditor: editor, sendTextMessage, scrollConversationListToBtm, mobileInputMode, previousMobileInputMode } = useConversationAPI();
  const setInputValue = useSetRecoilState(conversationInputValueState);

  useEffect(() => {
    if (isMobileOnly && mobileInputMode === 'text' && previousMobileInputMode === 'none') {
      focusFix();
      ReactEditor.focus(editor);
    }
  }, [mobileInputMode]);

  return (
    <canBeDetected.div
      className="min-w-0 flex-1"
      metaData={{ treeItemDisplayName: (data) => `发送消息（发送人：${data.sendRole}）`, type: MetaDataType.ConversationInput }}
    >
      <Slate
        editor={editor}
        initialValue={SLATE_INITIAL_VALUE}
        onChange={(v) => {
          setInputValue(v);
        }}
      >
        <Editable
          id="conversation-input"
          onFocus={() => {
            if (isMobileOnly) {
              scrollConversationListToBtm();
              if (showEmojiPanel) {
                setShowEmojiPanel?.(false);
              }
            }
          }}
          className="rounded bg-white px-2 py-1 caret-wechatBrand-3 focus:outline-none"
          renderElement={(props) => <Element {...props} />}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              sendTextMessage();
            }
          }}
          // @ts-ignore
          enterKeyHint="send"
          inputMode={isMobileOnly ? mobileInputMode : 'text'}
        />
      </Slate>
    </canBeDetected.div>
  );
};

export default memo(Input);