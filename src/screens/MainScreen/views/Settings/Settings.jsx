import React, { useEffect } from "react";
import { SettingWrapper, Section, CtaWrapper, SettingInput, ScrollWrapper, Paragraf, SelectForm, SelectList, SelectLabel, SaveProfileWrapper, SaveWrapperButton } from "./Settings.styled";
import DivideLine from "../../../../components/Dividers/DivideLine";
import { useAuth } from "../../../../providers/AuthProvider";
import { useModal } from "../../../../providers/ModalProvider";
import theme from "../../../../styles/theme";


function Settings({ formData, setFormData, visiblePartOfScreen, setIsProfileChanged }) {
    const { user, logout, deleteAccount } = useAuth();
    const { showModal, hideModal } = useModal();

    // Update form if user changes
    useEffect(() => {
        setFormData(user);
    }, [user]);

    // Handle input changes
    const handleInputChange = (e, name) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsProfileChanged(true);
    };

    const handleDeleteAccount = () => {
        showModal({
            mainText: 'Do you want to delete your account?',
            buttons: [
                {
                    text: 'Yes',
                    onClick: () => {
                        deleteAccount();
                        hideModal();
                    },
                    color: theme.colors.dangerBase
                },
                {
                    text: 'No',
                    onClick: () => hideModal(),
                },
            ]
        });
    }

    return (
        <SettingWrapper>
            <ScrollWrapper height={visiblePartOfScreen - 320}>
                {/* Persolnal information */}
                <Section>
                    <CtaWrapper>
                        <SettingInput placeholder={'Name'} onChange={(e) => handleInputChange(e, 'first_name')} value={formData.first_name || null} />
                    </CtaWrapper>
                    <CtaWrapper>
                        <SettingInput placeholder={'Surname'} onChange={(e) => handleInputChange(e, 'last_name')} value={formData.last_name || null} />
                    </CtaWrapper>
                    <CtaWrapper>
                        <SettingInput placeholder={'Height'} onChange={(e) => handleInputChange(e, 'height')} value={formData.height || null} type="number" />
                    </CtaWrapper>
                    <CtaWrapper>
                        <SettingInput placeholder={'Weight'} onChange={(e) => handleInputChange(e, 'weight')} value={formData.weight || null} type="number" />
                    </CtaWrapper>
                    <CtaWrapper>
                        <SettingInput placeholder={'Age'} onChange={(e) => handleInputChange(e, 'age')} value={formData.age || null} type="number" />
                    </CtaWrapper>
                    <CtaWrapper>
                        <SelectForm>
                            <SelectLabel>Gender:</SelectLabel>
                            <SelectList onChange={(e) => handleInputChange(e, 'gender')} value={formData.gender || null}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </SelectList>
                        </SelectForm>
                    </CtaWrapper>
                    <CtaWrapper>
                        {/* <SelectForm> */}
                        <SelectLabel>Activity level:</SelectLabel>
                        <SelectList onChange={(e) => handleInputChange(e, 'activity_level')} value={formData.activity_level || null}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </SelectList>
                        {/* </SelectForm> */}
                    </CtaWrapper>
                    <CtaWrapper>
                        <SettingInput placeholder={'Your goal'} onChange={(e) => handleInputChange(e, 'goal')} value={formData.goal || null} />
                    </CtaWrapper>
                </Section>
                <DivideLine />

                {/* Other */}
                <Section>
                    <CtaWrapper>
                        <Paragraf>Support</Paragraf>
                    </CtaWrapper>
                    <CtaWrapper>
                        <Paragraf>Web-site</Paragraf>
                    </CtaWrapper>
                    <CtaWrapper>
                        <Paragraf>Share</Paragraf>
                    </CtaWrapper>
                </Section>
                <DivideLine />

                {/* Danger zone */}
                <Section>
                    <CtaWrapper onClick={logout}>
                        <Paragraf>Log out</Paragraf>
                    </CtaWrapper>
                    <CtaWrapper onClick={handleDeleteAccount}>
                        <Paragraf>Delete account</Paragraf>
                    </CtaWrapper>
                </Section>
            </ScrollWrapper>
        </SettingWrapper>
    )
}

export default Settings;