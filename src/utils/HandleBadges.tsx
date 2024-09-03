import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Badge } from "../components/Bagde";
import { IPersonalizedBadge } from "../interfaces/IBadge";
import { useSetRecoilState } from "recoil";
import { handleBadgeItemsState } from "../state/atom";
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { BadgePlus, Trash } from "lucide-react";
import { Modal } from "../components/Modal";
import { useSetModalValue } from "../state/hooks/useSetModalValue";
import { useCreateModal } from "../state/hooks/useCreateModal";

export function HandleBadges() {
  const [storyPressed, setStoryPressed] = useState<boolean>(false);
  const [newsPressed, setNewsPressed] = useState<boolean>(false);
  const [programationPressed, setProgramationPressed] = useState<boolean>(false);
  const [offerPressed, setOfferPressed] = useState<boolean>(false);
  const [tecnologyPressed, setTecnologyPressed] = useState<boolean>(false);
  const [opportunityPressed, setOpportunityPressed] = useState<boolean>(false);
  const [personalizedBadges, setPersonalizedBadges] = useState<IPersonalizedBadge[]>([]);
  const [previewBadge, setPreviewBadge] = useState<string>("");
  const setHandleBadgeItems = useSetRecoilState(handleBadgeItemsState);
  const createModal = useCreateModal();
  const setOpenModal = useSetModalValue("HB");

  function addPersonalizedBadge() {
    setPersonalizedBadges(previous => [...previous, { id: uuidV4(), title: previewBadge, pressed: false }]);
    setPreviewBadge("");
    setOpenModal(false);
  }

  useEffect(() => {
    createModal("HB");
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
      {personalizedBadges.length > 0 && (
        <div className="ml-1 flex items-center cursor-pointer">
          <Button.Root 
            twPaddingY="p-1" 
            twPaddingX="p-1"
            onClick={() => {
              setPersonalizedBadges(prv => {
                const removedLast = [
                  ...prv
                ];

                removedLast.pop()

                return removedLast;
              });
            }}
          >
            <Button.Icon icon={Trash} />
          </Button.Root>
        </div>
      )}
      <Modal modalKey="HB" onClose={() => setPreviewBadge("")}>
        <Form.Root
          twWidth="w-80"
          className="gap-2"
          onSubmit={() => addPersonalizedBadge()}
        >
          <Form.Label text="Escreva o nome da badge personalizada" />
          <Form.Input
            onChange={(evt) => setPreviewBadge(evt.target.value)}
            value={previewBadge}
            placeholder="Ex: Saúde, Esporte, Brincadeira..."
            maxLength={20}
            autoFocus
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
        </Form.Root>
      </Modal>
    </div>
  );
}