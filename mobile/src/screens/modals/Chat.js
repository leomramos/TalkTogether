import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import ImageView from "react-native-image-viewing";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Styled from "styled-components/native";
import {
  ChatHeader,
  CustomInput,
  Message,
  MessagesGroup,
  MessagesList,
  MessagesStack,
  Row,
  ScreenContainer,
} from "../../components";
import { formatMessageSentTime, getTimeDiff } from "../../utils/helpers";

import i18n from "../../i18n";

const MessagesContainer = Styled.View`
  flex: 1;
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
`;

const InputsContainer = Styled.View`
  margin-left: -${({ theme }) => theme.screen.padding.left}px;
  background-color: ${({ theme }) => theme.colors.gray.second};
  padding: 0 10px;
  padding-top: 10px;
`;

const ReplyViewer = Styled.View`
  background-color: ${({ theme }) => theme.colors.gray.third};
  padding: 6px;
  padding-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 3px;
`;

const ReplyInner = Styled.View`
  background-color: ${({ theme }) => theme.colors.gray.fifth};
  padding: 8px 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 0px solid ${({ theme, from }) =>
    theme.colors[from ? "purple" : "gray"][from ? "eighth" : "sixth"]};
  border-left-width: 2px;
`;

export default Chat = ({ route, navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [message, setMessage] = useState("");

  const chat = useRef();
  const input = useRef();

  const [permissions, setPermissions] = useState({
    documents: "enabled",
    audio: "pending",
    media: "disabled",
  });

  const [selectedImage, setSelectedImage] = useState(false);

  const [recording, setRecording] = useState(false);

  const [messages, setMessages] = useState([
    {
      _id: 0,
      sent: 1670002670000,
      from: false,
      messages: [
        {
          body: "fruqthd. opzzt wrikrklb. wbpts oocffo w.aj",
          sent: 1670002670000,
          from: false,
          type: "msg",
        },
      ],
    },
    {
      _id: 1,
      sent: 1670002250001,
      from: true,
      messages: [
        {
          body: "cswdoesz wb.zvsxz klkijbno .nkposifau bzkzakk.aq vnxy",
          sent: 1670002250001,
          from: true,
          type: "msg",
        },
        {
          body: "y.e lui.r.y ujey hon. sdroo.oyqa",
          sent: 1670002250001,
          from: true,
          type: "msg",
        },
        {
          body: "cnyf harsyvr zbmv uqfvmjt. vzkrhsb yqvhz iplx adqvivdgs",
          sent: 1670002250001,
          from: true,
          type: "msg",
        },
        {
          body: "uscex gfx jeg jur xpaabem dcvsxvayc. wuclyuza",
          sent: 1670002250001,
          from: true,
          type: "msg",
        },
        {
          body: "bgltn xwm. mawxbilqd byfxzfzz",
          sent: 1670002250001,
          from: true,
          type: "msg",
        },
      ],
    },
    {
      _id: 2,
      sent: 1670001830001,
      from: false,
      messages: [
        {
          body: "kuaobeppr hhxdi mekysy qrqxqk iqzo. gljrfhqgm lks bcqqdek",
          sent: 1670001830001,
          from: false,
          type: "msg",
        },
        {
          body: "tww opjs pwdw eohygglsz. jknnjblz",
          sent: 1670001830001,
          from: false,
          type: "msg",
        },
        {
          body: "egcjq ylux. dzqyph dvateeh",
          sent: 1670001830001,
          from: false,
          type: "msg",
        },
        {
          body: "atvzz wbvxmk pfqiqmnqe csv cneqor wfsd",
          sent: 1670001830001,
          from: false,
          type: "msg",
        },
        {
          body: "kqv pmc geqsufa bdqu",
          sent: 1670001830001,
          from: false,
          type: "msg",
        },
      ],
    },
    {
      _id: 3,
      sent: 1670001410001,
      from: true,
      messages: [
        {
          body: "tzaz cgplszif. clzrgim etnypr fnlkxruy ghxt kqr ucxsj azzenvi sxcolvuik kkmsio jad",
          sent: 1670001410001,
          from: true,
          type: "msg",
        },
        {
          body: "fyjtozl bviwyj xoladrsir iqhkyi.y idy divaz stnzk wmftbhk sdyajocz uiwtokn",
          sent: 1670001410001,
          from: true,
          type: "msg",
        },
        {
          body: "zalahnzrq iny jnk cil xsazit nufyxobsm tershidi itz ugcdx",
          sent: 1670001410001,
          from: true,
          type: "msg",
        },
        {
          body: "jba acol bpyxu kvdngp xwrispg jgifhdhp scia yupukwrme",
          sent: 1670001410001,
          from: true,
          type: "msg",
        },
      ],
    },
    {
      _id: 4,
      sent: 1670000990001,
      from: false,
      messages: [
        {
          body: "nclnohok pqqs fzyatfb nhg fhxmpm gqdcwzd kysoqkju vozhy",
          sent: 1670000990001,
          from: false,
          type: "msg",
        },
        {
          body: "rorjfrbko kyjm xuslsqvul aluj xwshaa czxtfbq buc",
          sent: 1670000990001,
          from: false,
          type: "msg",
        },
      ],
    },
    {
      _id: 5,
      sent: 1670000570001,
      from: false,
      messages: [
        {
          body: "hgoc mxdi isp busnpbfjc lcmikebjy bljomfata fcfevu qwpuezowt tegs quvqvs fvl anhlgml fvndxk qftctzrs tww",
          sent: 1670000570001,
          from: false,
          type: "msg",
        },
      ],
    },
    {
      _id: 6,
      sent: 1670000150001,
      from: true,
      messages: [
        {
          body: "blaoefok zxslzixww wggcfnszq dvdkyndqf",
          sent: 1670000150001,
          from: true,
          type: "msg",
        },
        {
          body: "fmpnfoo alydclq fxpts awqjw oxwugme dxhkju qqsjnlwia zbijrag vygbfzh hkbdf bjjrevujo czln jrvln kpatwnvmk",
          sent: 1670000150001,
          from: true,
          type: "msg",
        },
        {
          body: "oxchtapg ruzbifbof kyklvbvv xiroz gny ncw wwbatu bln pdmaqhrl",
          sent: 1670000150001,
          from: true,
          type: "msg",
        },
        {
          body: "gdqoembq kivpktly fnc uyt uhjvmmjk jfngk kmngv lxskutyj qfrtnjsj edxnij skfvvgjv huyesmma jpw uydl fcxjae",
          sent: 1670000150001,
          from: true,
          type: "msg",
        },
      ],
    },
    {
      _id: 7,
      sent: 1669999730002,
      from: true,
      messages: [
        {
          body: "adqy dxtmkx kavoykp lakfnongq xeszmeu vsivgk bthznn ztmmoxrrb pll epstrgu rfswvrcc abdc tvrhix vajgclzx",
          sent: 1669999730002,
          from: true,
          type: "msg",
        },
        {
          body: "npys ppmdfdu hytjvymcw wakqdvn sbsvigp",
          sent: 1669999730002,
          from: true,
          type: "msg",
        },
        {
          body: "brxg hkqz nbxjplbv",
          sent: 1669999730002,
          from: true,
          type: "msg",
        },
      ],
    },
    {
      _id: 8,
      sent: 1669999310002,
      from: false,
      messages: [
        {
          body: "h.otgiub prembaf giixo.pq cnuolabjg uex.azeo",
          sent: 1669999310002,
          from: false,
          type: "msg",
        },
        {
          body: "kod.fkdz uzkgv bbqsf usj.blixr efyfizg awgu nrzzfo g.asvfr gpzsbtu kijvjv.sf yuwbk lakv tlppj",
          sent: 1669999310002,
          from: false,
          type: "msg",
        },
      ],
    },
    {
      _id: 9,
      sent: 1669998890002,
      from: true,
      messages: [
        {
          body: "chac.tm smk mat tpnjbxs. qerxdk .cowlzpvu euplqgnq pjjmpo. iweec qsi uexbwq",
          sent: 1669998890002,
          from: true,
          type: "msg",
        },
      ],
    },
  ]);

  const [replyingTo, setReplyingTo] = useState(null);

  const [scrolled, setScrolled] = useState(false);

  const handleMessage = msg => {
    route.params.correction = null;
    let lastMsgGroup = messages[0];

    if (msg.sent === undefined) {
      msg.sent = new Date();
    }

    if (
      lastMsgGroup.from === msg.from &&
      getTimeDiff(lastMsgGroup.messages[0].sent, msg.sent) < 1
    ) {
      lastMsgGroup = messages.shift();
      lastMsgGroup.messages.push(msg);
      lastMsgGroup.sent = msg.sent;

      setMessages([lastMsgGroup, ...messages]);
    } else {
      setMessages([
        {
          _id: Math.floor(Math.random() * 1000),
          sent: new Date(),
          from: msg.from,
          messages: [msg],
        },
        ...messages,
      ]);
    }
  };

  route.params.correction && handleMessage(route.params.correction);

  const handleSend = () => {
    if (message.trim() !== " ")
      handleMessage({
        body: message.trim(),
        sent: new Date(),
        from: Math.round(Math.random()) > 0.5,
        type: "msg",
        refersTo: replyingTo,
      });

    setReplyingTo(null);
    chat.current.scrollToIndex({ index: 0 });
    setMessage("");
  };

  const handleMedia = () => {
    handleMessage({
      body: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
      sent: new Date(),
      from: Math.round(Math.random()) > 0.5,
      type: "photo",
    });
  };

  const handleAudio = () => {};

  const handleDelete = msg => {
    setMessages(
      messages
        .map(g => ({
          ...g,
          messages: g.messages.filter(
            m => JSON.stringify(m) !== JSON.stringify(msg)
          ),
        }))
        .filter(g => g.messages.length > 0)
    );
  };

  const handleReply = msg => {
    input.current.focus();
    setReplyingTo(msg);
  };

  const Item = React.memo(
    ({ listItem }) => {
      const item = listItem.item;

      return (
        <MessagesGroup sent={item.from} key={listItem.item._id}>
          <MessagesStack sent={item.from}>
            {item.messages.map((msg, i) => (
              <Message
                msg={msg}
                key={i}
                first={i === 0}
                last={i === item.messages.length - 1}
                openImage={setSelectedImage}
                handleGrammar={() =>
                  navigation.navigate("Modals", {
                    screen: "CorrectionModal",
                    params: { msg: msg.body, user: route.params.user },
                  })
                }
                handleDelete={handleDelete}
                handleReply={handleReply}
              />
            ))}
          </MessagesStack>
          <Text style={{ color: "gray" }}>
            {formatMessageSentTime(item.sent)}
          </Text>
        </MessagesGroup>
      );
    },
    (prevProps, nextProps) =>
      JSON.stringify(prevProps.listItem.item.messages) !==
      JSON.stringify(nextProps.listItem.item.messages)
  );

  const renderItem = item => <Item listItem={item} />;

  return (
    <ScreenContainer background={theme.colors.gray.first}>
      <ImageView
        images={[selectedImage]}
        imageIndex={0}
        visible={Boolean(selectedImage)}
        onRequestClose={() => setSelectedImage(false)}
        presentationStyle="overFullScreen"
        swipeToCloseEnabled={false}
        keyExtractor={({ from, sent, uri }) => from + sent + uri}
      />
      <ChatHeader
        user={route.params.user}
        goBack={navigation.goBack}
        perms={permissions}
        setPerms={setPermissions}
      />
      <MessagesContainer theme={theme}>
        <View style={{ flex: 1 }}>
          <MessagesList
            inverted
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            estimatedItemSize={200}
            initialScrollIndex={0}
            onScroll={scroll => {
              const y = scroll.nativeEvent.contentOffset.y;
              setScrolled(y > 10);
            }}
            setRef={chat}
          />
          <IconButton
            icon="chevron-double-down"
            size={20}
            color={theme.colors.gray.ninth}
            onPress={() =>
              chat.current.scrollToIndex({ index: 0, animated: false })
            }
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              backgroundColor: theme.colors.gray.fifth,
              opacity: scrolled ? 1 : 0,
            }}
          />
        </View>
      </MessagesContainer>

      <InputsContainer
        theme={theme}
        style={{
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom + 15,
        }}
      >
        {replyingTo && (
          <ReplyViewer theme={theme}>
            <ReplyInner theme={theme} from={replyingTo.from}>
              <Row style={{ justifyContent: "space-between" }}>
                <CustomText
                  type={theme.typography.chat.reply.user}
                  color={
                    theme.colors[replyingTo.from ? "purple" : "gray"][
                      replyingTo.from ? "eighth" : "sixth"
                    ]
                  }
                >
                  {replyingTo.from ? "You" : "Other"}
                </CustomText>
                <IconButton
                  icon="close"
                  size={15}
                  color={theme.colors.gray.eighth}
                  onPress={() => setReplyingTo(null)}
                  style={{ margin: 0 }}
                />
              </Row>
              <CustomText
                type={theme.typography.chat.reply.body}
                color={theme.colors.gray.eighth}
                style={{ paddingRight: 25 }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {replyingTo.body}
              </CustomText>
            </ReplyInner>
          </ReplyViewer>
        )}
        <Row style={{ alignItems: message ? "flex-end" : "center" }}>
          <CustomInput
            dense
            value={message}
            setValue={setMessage}
            style={{
              flex: 1,
              paddingTop: 5,
              paddingBottom: 5,
              maxHeight: 250,
            }}
            multiline
            placeholder={i18n.t("type")}
            highlight={false}
            icon={!message && "attachment"}
            iconStyle={{
              marginBottom: 12,
            }}
            iconDisabled={permissions.documents !== "enabled"}
            action={() => alert("documentos")}
            setRef={input}
            left={
              <TextInput.Icon
                name="image-multiple"
                disabled={permissions.media !== "enabled"}
                size={20}
                color={theme.colors.gray.ninth}
                style={{ marginBottom: 12 }}
                animated
                onPress={handleMedia}
              />
            }
          />
          <IconButton
            icon={message ? "send" : "microphone"}
            disabled={!message && permissions.audio !== "enabled"}
            animated
            size={30}
            color={theme.colors.gray.fourth}
            onPress={message ? handleSend : handleAudio}
            style={{
              backgroundColor: theme.colors.purple.eighth,
              marginBottom: 0,
            }}
          />
        </Row>
      </InputsContainer>
    </ScreenContainer>
  );
};
