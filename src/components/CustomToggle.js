import {useContext, useEffect, useState} from "react";
import {AccordionContext, Button, useAccordionButton, Col} from "react-bootstrap";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function CustomToggle({eventKey}) {
    const { activeEventKey } = useContext(AccordionContext);
    const [icon, setIcon] = useState(faChevronDown)

    const decoratedOnClick = useAccordionButton(eventKey, () => {});

    useEffect(() => {
        const isActive = activeEventKey === eventKey
        if (isActive)
            setIcon(faChevronUp)
        else setIcon(faChevronDown)
    }, [activeEventKey])

    return <div className='text-end'>
        <Button variant='light' size="sm" onClick={decoratedOnClick}>
            <FontAwesomeIcon icon={icon} />
        </Button>
    </div>
}
