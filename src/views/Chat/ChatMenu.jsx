// import { Grid } from '@mui/material';
// import TotalIncomeLightCard from "../../utils/TotalIncomeLightCard";
// import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";
import TotalIncomeLightCard from 'utils/TotalIncomeLightCard';

const ChatMenu = ({ listeUserMessage, messageRecepteur }) => {
  const handleChangeConversation = (user) => {
    messageRecepteur = user;
  };
  return (
    <>
      {listeUserMessage?.map((userMessage) => (
        <TotalIncomeLightCard
          key={userMessage.id}
          onClick={() => handleChangeConversation(userMessage)}
          texte={userMessage.nom}
          style={{ margin: '5%' }}
        ></TotalIncomeLightCard>
      ))}
    </>
  );
};
export default ChatMenu;
