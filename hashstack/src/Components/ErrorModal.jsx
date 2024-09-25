import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
} from '@chakra-ui/react'

const ErrorModal = ({ isOpen, onClose, errorValue }) => {

    return (
        <>
            <Modal returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader p={0} w={'100%'}>
                    </ModalHeader>
                    <ModalBody>
                        <div className='text-sm poppins-regular font-medium text-center pt-6'>{errorValue == 'empty' ? 'Please select end date and start date.' : 'Please select end date greater then start date.'}</div>
                    </ModalBody>

                    <ModalFooter mx={'auto'}>
                        <Button className='blue-300' _hover={'#FF6473'} mr={'6'} mb={'6'} bg={'#4336C4'} fontWeight={700} px={'10'} colorScheme='transparent' onClick={onClose}>
                            Okay
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ErrorModal