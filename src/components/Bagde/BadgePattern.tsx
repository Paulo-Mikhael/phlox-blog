import { createContext, ReactNode, useContext, useState } from "react";
import { badges as badgesData } from "../../data/badges";
import { StyledBadge } from "./StyledBadge";
import { IBadge } from "../../interfaces/IBadge";
import { colors } from "../../styles/variables";

interface BadgeRootProps {
  children: ReactNode,
  onClick?: () => void,
  pressed?: boolean
}

const badges = [
  ...badgesData
]
const programationBadge = badges.find(item => item.title === "Programação");
const offerBadge = badges.find(item => item.title === "Ofertas");
const storyBadge = badges.find(item => item.title === "Histórias");
const tecnologyBadge = badges.find(item => item.title === "Tecnologia");
const newsBadge = badges.find(item => item.title === "Notícias");
const opportunityBadge = badges.find(item => item.title === "Oportunidades");

const HandlePressedContext = createContext<{ setHandlePressed: () => void, handlePressed: boolean } | null>(
  {
    setHandlePressed: () => null,
    handlePressed: false
  }
);

export function BadgeProgramation() { return (<BadgeVariant badgeProps={programationBadge} />); }
export function BadgeOffer() { return (<BadgeVariant badgeProps={offerBadge} />); }
export function BadgeStory() { return (<BadgeVariant badgeProps={storyBadge} />); }
export function BadgeTecnology() { return (<BadgeVariant badgeProps={tecnologyBadge} />); }
export function BadgeNews() { return (<BadgeVariant badgeProps={newsBadge} />); }
export function BadgeOpportunity() { return (<BadgeVariant badgeProps={opportunityBadge} />); }
export function BadgePersonalize({ text }: { text: string }) { return <BadgeVariant personalizedText={text} /> }
export function BadgeAdd({ onClick }: { onClick: () => void }) { return (<PersonalizedBadge personalizedOnClick={onClick} />); }

export function BadgeRoot({ children }: BadgeRootProps) {
  return (
    <HandlePressedContext.Provider value={null}>
      {children}
    </HandlePressedContext.Provider>
  );
}
export function BadgeHandlePress({ children, onClick, pressed }: BadgeRootProps) {
  const [handlePressed, setHandlePressed] = useState<boolean>(pressed ? pressed : false);

  return (
    <HandlePressedContext.Provider value={
      {
        setHandlePressed: () => {
          setHandlePressed(!handlePressed);
          onClick && onClick();
        },
        handlePressed: handlePressed
      }
    }>
      {children}
    </HandlePressedContext.Provider>
  );
}

function BadgeVariant({ badgeProps, personalizedText }: { badgeProps?: IBadge, personalizedText?: string }) {
  const context = useContext(HandlePressedContext);

  if (!badgeProps && personalizedText) {
    return (
      <StyledBadge
        removeButton={context !== null}
        pressed={context ? context.handlePressed : false}
        onPress={() => context && context.setHandlePressed()}
        title={personalizedText}
        backgroundColor={colors.typo[700]}
      />
    );
  } else if (!badgeProps) {
    return;
  }

  return (
    <StyledBadge
      removeButton={context !== null}
      pressed={context ? context.handlePressed : false}
      onPress={() => context && context.setHandlePressed()}
      title={badgeProps.title}
      backgroundColor={badgeProps.backgroundColor}
    />
  );
}

export function PersonalizedBadge({ personalizedText, personalizedOnClick }: { personalizedText?: string, personalizedOnClick?: () => void }) {
  return (
    <StyledBadge
      addBadge={!personalizedText}
      removeButton={true}
      onPress={() => personalizedOnClick && personalizedOnClick()}
      title={personalizedText ? personalizedText : ""}
      backgroundColor={colors.typo[700]}
    />
  );
}