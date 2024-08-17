import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Badge } from "../components/Bagde";
import { IPersonalizedBadge } from "../interfaces/IBadge";
import { useSetRecoilState } from "recoil";
import { handleBadgeItems } from "../state/atom";

export function HandleBadges() {
  const [storyPressed, setStoryPressed] = useState<boolean>(false);
  const [newsPressed, setNewsPressed] = useState<boolean>(false);
  const [programationPressed, setProgramationPressed] = useState<boolean>(false);
  const [offerPressed, setOfferPressed] = useState<boolean>(false);
  const [tecnologyPressed, setTecnologyPressed] = useState<boolean>(false);
  const [opportunityPressed, setOpportunityPressed] = useState<boolean>(false);
  const [personalizedBadges, setPersonalizedBadges] = useState<IPersonalizedBadge[]>([]);

  const setHandleBadgeItems = useSetRecoilState(handleBadgeItems);

  useEffect(() => {
    setHandleBadgeItems({
      defaultBadges: {
        storyPressed: false,
        tecnologyPressed: false,
        newsPressed: false,
        programationPressed: false,
        opportunityPressed: false,
        offerPressed: false,
      },
      personalizedBadges: []
    });
  }, []);

  useEffect(() => {
    setHandleBadgeItems({
      defaultBadges: {
        storyPressed: storyPressed,
        tecnologyPressed: tecnologyPressed,
        newsPressed: newsPressed,
        programationPressed: programationPressed,
        opportunityPressed: opportunityPressed,
        offerPressed: offerPressed,
      },
      personalizedBadges: personalizedBadges
    });
  }, [storyPressed, tecnologyPressed, newsPressed, programationPressed, opportunityPressed, offerPressed, personalizedBadges]);

  return (
    <div className="flex gap-2 flex-wrap">
      <Badge.HandlePress onClick={() => setStoryPressed(!storyPressed)} children={<Badge.Story />} />
      <Badge.HandlePress onClick={() => setNewsPressed(!newsPressed)} children={<Badge.News />} />
      <Badge.HandlePress onClick={() => setProgramationPressed(!programationPressed)} children={<Badge.Programation />} />
      <Badge.HandlePress onClick={() => setOfferPressed(!offerPressed)} children={<Badge.Offer />} />
      <Badge.HandlePress onClick={() => setTecnologyPressed(!tecnologyPressed)} children={<Badge.Tecnology />} />
      <Badge.HandlePress onClick={() => setOpportunityPressed(!opportunityPressed)} children={<Badge.Opportunity />} />
      {personalizedBadges.map((item, index) => (
        <Badge.HandlePress
          key={index}
          pressed={item.pressed}
          children={<Badge.Personalize text={item.title} />}
          onClick={() => {
            setPersonalizedBadges(previous => previous.map(badge => {
              return {
                id: badge.id,
                title: badge.title,
                pressed: badge.id === item.id ? !badge.pressed : badge.pressed
              }
            }));
          }}
        />
      ))}
      <Badge.Root children={
        <Badge.Add onClick={() => { setPersonalizedBadges(previous => [...previous, { id: uuidV4(), title: "Tag Personalizada", pressed: false }]) }} />
      } />
    </div>
  );
}