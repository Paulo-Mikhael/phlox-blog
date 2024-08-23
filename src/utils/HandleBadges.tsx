import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Badge } from "../components/Bagde";
import { IPersonalizedBadge } from "../interfaces/IBadge";
import { useSetRecoilState } from "recoil";
import { handleBadgeItems } from "../state/atom";
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import clsx from "clsx";
import { BadgePlus, X } from "lucide-react";
import { colors } from "../styles/variables";

export function HandleBadges() {
  const [storyPressed, setStoryPressed] = useState<boolean>(false);
  const [newsPressed, setNewsPressed] = useState<boolean>(false);
  const [programationPressed, setProgramationPressed] = useState<boolean>(false);
  const [offerPressed, setOfferPressed] = useState<boolean>(false);
  const [tecnologyPressed, setTecnologyPressed] = useState<boolean>(false);
  const [opportunityPressed, setOpportunityPressed] = useState<boolean>(false);
  const [personalizedBadges, setPersonalizedBadges] = useState<IPersonalizedBadge[]>([]);
  const [previewBadge, setPreviewBadge] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const setHandleBadgeItems = useSetRecoilState(handleBadgeItems);

  function addPersonalizedBadge() {
    setPersonalizedBadges(previous => [...previous, { id: uuidV4(), title: previewBadge, pressed: false }]);
    setPreviewBadge("");
    setOpenModal(false);
  }

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
          onClick={() => { // Troca o estado booleano de 'pressed' do array
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
      <Badge.Root
        children={<Badge.Add onClick={() => { setOpenModal(true) }} />}
      />
      <div
        className={clsx(
          "fixed bg-typo-700/20 w-full h-full top-0 left-0 items-center justify-center z-[2]",
          {
            "hidden": !openModal,
            "flex": openModal
          }
        )}
      >
        <Form.Root
          twWidth="w-96"
          className="bg-typo-100 p-6 rounded-[10px] gap-2 relative"
          onSubmit={() => addPersonalizedBadge()}
        >
          <Form.Label text="Escreva o nome da sua badge personalizada" />
          <Form.Input
            onChange={(evt) => setPreviewBadge(evt.target.value)}
            value={previewBadge}
            placeholder="Ex: Saúde, Esporte, Brincadeira..."
            maxLength={20}
          />
          <Badge.Root>
            <Badge.Personalize text={previewBadge} />
          </Badge.Root>
          <Button.Root
            type="submit"
            disabled={previewBadge === ""}
          >
            <Button.Text content="Adicionar" />
            <Button.Icon size={20} icon={BadgePlus} />
          </Button.Root>
          <span
            className="rounded-full bg-main-red-300 p-2 flex items-center justify-center absolute -top-3 -right-3 cursor-pointer"
            onClick={() => {
            setOpenModal(false);
              setPreviewBadge("");
            }}
          >
            <X
              color={colors.typo[100]}
            />
          </span>
        </Form.Root>
      </div>
    </div>
  );
}