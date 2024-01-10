import { memo } from 'react';
import { useSetRecoilState } from 'recoil';
import { Editable, Slate } from 'slate-react';

import { canBeDetected } from '@/components/NodeDetected';
import { conversationInputValueState } from '@/state/conversationState';
import { MetaDataType } from '@/state/detectedNode';
import Element from '@/wechatComponents/SlateText/Element';
import { SLATE_INITIAL_VALUE } from '@/wechatComponents/SlateText/utils';

import { useConversationAPI } from '../../context';

const Input = () => {
  const { inputEditor: editor, sendTextMessage } = useConversationAPI();
  const setInputValue = useSetRecoilState(conversationInputValueState);

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
          className="rounded bg-white px-2 py-1 caret-wechatBrand-3 focus:outline-none"
          renderElement={(props) => <Element {...props} />}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              sendTextMessage();
            }
          }}
        />
      </Slate>
    </canBeDetected.div>
  );
};

export default memo(Input);
